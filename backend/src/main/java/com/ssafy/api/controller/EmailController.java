package com.ssafy.api.controller;

import com.ssafy.api.service.EmailService;
import com.ssafy.api.service.MemberService;
import com.ssafy.api.service.RedisService;
import com.ssafy.common.db.dto.request.MemberAuthReqDto;
import com.ssafy.common.db.dto.request.MemberPwdReqDto;
import com.ssafy.common.db.dto.request.PlanInviteReqDto;
import com.ssafy.common.util.common.MemberUtil;
import com.ssafy.common.util.etc.RandValueMaker;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    private final RedisService redisService;

    private final RandValueMaker randValueMaker;

    private final MemberService memberService;

    private final MemberUtil memberUtil;

    @Transactional
    @PostMapping("/send")
    @Operation(summary = "메일인증", description = "8자리 인증코드를 세션에 저장 및 메일 전송", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "유효하지 않은 메일 요청")})
    public ResponseEntity<?> sendEmail(@Parameter(name = "email") @RequestBody String email) {

        String authCode = randValueMaker.makeAuthCode();
        long time = 1000 * 60 * 5;

        try {

            emailService.emailAuth(email, authCode);
        }

        catch (Exception e) {

            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // set => redis 키 값이 없으면 생성, 있으면 자동으로 갱신
        redisService.set(email + "_auth_code", authCode, time, TimeUnit.MILLISECONDS);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/pwd")
    @Operation(summary = "비밀번호 찾기", description = "11자리 비밀번호 생성, DB저장, 메일 전송", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 메일 요청"),
            @ApiResponse(responseCode = "401", description = "등록되지 않은 사용자")})
    public ResponseEntity<?> findPwd(@Parameter(name = "memberPwdReqDto") @RequestBody MemberPwdReqDto memberPwdReqDto) {

        String id = memberPwdReqDto.getId();
        String email = memberPwdReqDto.getEmail();

        String newPwd = randValueMaker.makeRandPwd();

        if(memberService.findPwd(email, id, newPwd)) {

            try {

                emailService.sendPwd(email, newPwd);
            }

            catch (Exception e) {

                return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<Void>(HttpStatus.OK);
        }

        return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
    }

    @Transactional
    @PostMapping("/auth")
    @Operation(summary = "인증번호 확인", description = "전송된 인증번호와 Redis의 인증번호를 비교", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "기간 만료"),
            @ApiResponse(responseCode = "500", description = "인증번호 다름")})
    public ResponseEntity<?> mathAuthCode(@Parameter(name = "memberAuthReqDto") @RequestBody MemberAuthReqDto memberAuthReqDto) {

        // Object 형태로 반환되므로 String으로 형변환
        String originAuthCode = redisService.get(memberAuthReqDto.getEmail() + "_auth_code").toString();

        if(originAuthCode == null) {

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

        else if(memberAuthReqDto.getAuthCode().equals(originAuthCode)) {
            
            return new ResponseEntity<Void>(HttpStatus.OK);
        }

        else return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    @PostMapping("/invite")
    @Operation(summary = "초대", description = "해당 이메일로 계획 참가 요청 전송", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 메일 요청")})
    public ResponseEntity<?> inviteToPlan(@Parameter(name = "planInviteReqDto") @RequestBody PlanInviteReqDto planInviteReqDto) {

        String id = memberUtil.getMemberIdFromPrincipal();

        try {

            emailService.sendJoinRequest(id, planInviteReqDto.getEmail(), planInviteReqDto.getLink());

            // 회원인 경우
            return new ResponseEntity<Void>(HttpStatus.OK);
        }

        catch (Exception e) {

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
}