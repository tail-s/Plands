package com.ssafy.api.controller;

import com.ssafy.api.service.MemberService;
import com.ssafy.common.db.dto.request.MemberModifyReqDto;
import com.ssafy.common.db.dto.request.MemberPwdModifyReqDto;
import com.ssafy.common.db.dto.response.MemberDto;
import com.ssafy.common.util.common.MemberUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    private final MemberUtil memberUtil;

    // 다른 유저도 조회 가능하게 변경 가능
    @Transactional
    @GetMapping
    @Operation(summary = "디테일", description = "로그인한 회원 정보 조회", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = MemberDto.class)))})
    public ResponseEntity<?> detailMember() {

        String id = memberUtil.getMemberIdFromPrincipal();

        return new ResponseEntity<MemberDto>(memberService.detail(id), HttpStatus.OK);
    }

    // 쓰려면 admin만 되게 할 지 고려해야 함
    @Transactional
    @GetMapping("/list")
    @Operation(summary = "리스트", description = "(sort 추가 및 상세구현 필요) 설정한 offset/size 만큼의 회원리스트 반환", responses = {
            @ApiResponse(responseCode = "200", description = "리스트 조회 성공",
            content = @Content(schema = @Schema(implementation = List.class)))})
    public ResponseEntity<?> findAllMember(@Parameter(name = "offset") @RequestParam("offset") int offset,
                                           @Parameter(name = "size") @RequestParam("size") int size) {

        return new ResponseEntity<List<MemberDto>>(memberService.findAll(offset, size), HttpStatus.OK);
    }

    @Transactional
    @PutMapping
    @Operation(summary = "수정", description = "로그인한 회원 정보 수정", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> modifyMember(@Parameter(name = "memberModifyReqDto")
                                              @RequestBody MemberModifyReqDto memberModifyReqDto) {

        String id = memberUtil.getMemberIdFromPrincipal();

        memberService.modify(id, memberModifyReqDto);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/newpwd")
    @Operation(summary = "비밀번호 수정", description = "토큰의 id와 사용자가 입력한 pwd가 일치하면 비밀번호 갱신", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "비밀번호 불일치")})
    public ResponseEntity<?> modifyPwd(@Parameter(name = "memberPwdModifyReqDto")
                                           @RequestBody MemberPwdModifyReqDto memberPwdModifyReqDto) {

        String id = memberUtil.getMemberIdFromPrincipal();
        String originPwd = memberPwdModifyReqDto.getInputPwd();
        String newPwd = memberPwdModifyReqDto.getNewPwd();

        if(memberService.modifyPwd(id, originPwd, newPwd)) {

            return new ResponseEntity<Void>(HttpStatus.OK);
        }

        return  new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    @Transactional
    @PostMapping("/id")
    @Operation(summary = "아이디 찾기", description = "이메일로 조회하여 등록된 사용자면 끝의 4글자가 *로 바뀐 아이디 반환", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "등록되지 않은 사용자")})
    public ResponseEntity<?> findId(@Parameter(name = "email") @RequestBody String email) {

        String hiddenId = memberService.findId(email);

        if(hiddenId != null) {

            return new ResponseEntity<String>(hiddenId, HttpStatus.OK);
        }

        return new ResponseEntity<Void>(HttpStatus.CONFLICT);
    }

    @Transactional
    @GetMapping("/id")
    @Operation(summary = "아이디 중복체크", description = "아이디 중복 체크", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "이미 존재하는 아이디")})
    public ResponseEntity<?> checkIsDuplicatedId(@Parameter(name = "id") @RequestParam String id) {

        if(memberService.checkId(id)) {

            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/email")
    @Operation(summary = "이메일 중복체크", description = "이메일 중복 체크", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "이미 존재하는 이메일")})
    public ResponseEntity<?> checkIsDuplicatedEmail(@Parameter(name = "email") @RequestParam String email) {

        if(memberService.checkEmail(email)) {

            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
