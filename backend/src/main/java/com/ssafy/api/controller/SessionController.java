package com.ssafy.api.controller;

import com.ssafy.api.service.JwtService;
import com.ssafy.api.service.MemberService;
import com.ssafy.api.service.RedisService;
import com.ssafy.common.db.dto.request.MemberLoginReqDto;
import com.ssafy.common.db.dto.request.MemberRegistReqDto;
import com.ssafy.common.db.dto.response.TokenDto;
import com.ssafy.common.db.repository.support.MemberRepositorySupport;
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

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {

    private final MemberService memberService;

    private final MemberRepositorySupport memberRepositorySupport;

    private final JwtService jwtService;

    private final MemberUtil memberUtil;

    private final RedisService redisService;

    @Transactional
    @PostMapping("/login")
    @Operation(summary = "로그인", description = "access-token/refresh-token 발급 후 Redis 저장 및 프론트에 반환", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "401", description = "등록되지 않은 사용자")})
    public ResponseEntity<?> login(@Parameter(name = "memberLoginReqDto")
                                   @RequestBody MemberLoginReqDto memberLoginReqDto) {

        if(memberService.login(memberLoginReqDto)) {

            Map<String, TokenDto> resultMap = new HashMap<>();

            TokenDto accessToken = jwtService.createToken(memberLoginReqDto.getId(), "accessToken");
            TokenDto refreshToken = jwtService.createToken(memberLoginReqDto.getId(), "refreshToken");
            resultMap.put("access-token", accessToken);
            resultMap.put("refresh-token", refreshToken);

            redisService.set(memberLoginReqDto.getId()+"_refresh_token", refreshToken.getValue(),
                    refreshToken.getValidDate(), TimeUnit.MILLISECONDS);

            return new ResponseEntity<Map<String, TokenDto>>(resultMap, HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Transactional
    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "access-token 블랙리스트 등록, refresh-token 삭제", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> logout(HttpServletRequest request) {

        String id = memberUtil.getMemberIdFromPrincipal();
        String token = jwtService.resolveToken(request);

        memberRepositorySupport.closeSession(id, token);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/regist")
    @Operation(summary = "회원가입", description = "등록된 아이디/이메일인지 조회 후 아니면 회원가입", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "이미 존재하는 아이디 혹은 이메일")})
    public ResponseEntity<?> registMember(@Parameter(name = "memberRegistReqDto")
                                          @RequestBody MemberRegistReqDto memberRegistReqDto) {

        if(memberService.regist(memberRegistReqDto)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.CONFLICT);
    }

    @Transactional
    @DeleteMapping
    @Operation(summary = "탈퇴", description = "로그인한 회원 정보 삭제 및 토큰 삭제", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> deleteMember(HttpServletRequest request) {

        String id = memberUtil.getMemberIdFromPrincipal();
        String token = jwtService.resolveToken(request);

        memberRepositorySupport.closeSession(id, token);

        memberService.delete(id);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/reissue")
    @Operation(summary = "리이슈", description = "refresh-token을 비교하여 access-token 재발급", responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "서버/클라이언트에 해당 refresh-token 미 존재"),
            @ApiResponse(responseCode = "403", description = "서버/클라이언트 refresh-token값 다름")})
    public ResponseEntity<?> reissue(HttpServletRequest request, String token) {

        String id = memberUtil.getMemberIdFromPrincipal();

        // redis에서 해당 key값이 없을 시 null 반환
        Object serverTokenObj = redisService.get(id+"_refresh_token");
        String serverTokenStr = null;

        // nullPointerException 방지
        if(serverTokenObj != null) {
            serverTokenStr = serverTokenObj.toString();
        }

        // nullPointerException 방지 optinal사용 => Optional.of()는 param null일 때 익셉션 발생
        Optional<String> clientRefreshToken = Optional.ofNullable(token);
        Optional<String> serverRefreshToken = Optional.ofNullable(serverTokenStr);

        if(!clientRefreshToken.isPresent() || !serverRefreshToken.isPresent()) {

            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }

        else if (!clientRefreshToken.get().equals(serverRefreshToken.get())) {

            return new ResponseEntity<Void>(HttpStatus.FORBIDDEN);
        }
        
        TokenDto accessTokenDto = jwtService.createToken(id, "accessToken");

        return new ResponseEntity<TokenDto>(accessTokenDto, HttpStatus.OK);
    }
}
