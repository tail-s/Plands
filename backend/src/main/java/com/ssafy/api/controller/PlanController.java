package com.ssafy.api.controller;

import com.ssafy.api.service.PlanService;
import com.ssafy.common.db.dto.request.PlanCreateReqDto;
import com.ssafy.common.db.dto.response.PlanDto;
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
import java.util.UUID;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/plan")
public class PlanController {

    private final PlanService planService;

    private final MemberUtil memberUtil;

    @Transactional
    @PostMapping("/create")
    @Operation(summary = "생성", description = "계획 생성 및 DB에 연관 테이블 저장", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = PlanDto.class)))})
    public ResponseEntity<?> createPlan(@Parameter(name = "planCreateReqDto") @RequestBody PlanCreateReqDto planCreateReqDto) {

        String leader = memberUtil.getMemberIdFromPrincipal();
        planService.create(leader, planCreateReqDto);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{code}")
    @Operation(summary = "삭제", description = "계획정보 삭제", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> deletePlan(@Parameter(name = "code") @PathVariable UUID code) {

        String leader = memberUtil.getMemberIdFromPrincipal();

        planService.delete(leader, code);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/{code}")
    @Operation(summary = "조인", description = "계획에 참여", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> joinPlan(@Parameter(name = "code") @PathVariable UUID code) {

        String id = memberUtil.getMemberIdFromPrincipal();

        planService.join(id, code);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/list")
    @Operation(summary = "리스트", description = "설정한 offset/size 만큼의 사용자가 참여중인 계획들의 uuid값 반환", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = List.class)))})
    public ResponseEntity<?> findAllPlaner(@Parameter(name = "offset") @RequestParam("offset") int offset,
                                           @Parameter(name = "size") @RequestParam("size") int size) {

        String id = memberUtil.getMemberIdFromPrincipal();

        return new ResponseEntity<List<PlanDto>>(planService.findAll(id, offset, size), HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/count")
    @Operation(summary = "카운트", description = "전체 계획을 offset으로 나눈 페이지 개수 반환", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = Long.class)))})
    public ResponseEntity<?> findPageSize() {

        String id = memberUtil.getMemberIdFromPrincipal();

        return new ResponseEntity<Integer>(planService.getSize(id), HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/auth")
    @Operation(summary = "권한 조회", description = "회원이 해당 계획의 리더인지 아닌지 판별", responses = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = String.class)))})
    public ResponseEntity<?> discernIsLeader(@Parameter(name = "code") @RequestParam("code") UUID code) {

        String id = memberUtil.getMemberIdFromPrincipal();

        final String AUTH_INFO = planService.discernIsLeader(id, code) ? "LEADER" : "PLANER";

        return new ResponseEntity<String>(AUTH_INFO, HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/exit")
    @Operation(summary = "나가기", description = "참여중인 계획 나가기", responses = {
            @ApiResponse(responseCode = "200", description = "성공")})
    public ResponseEntity<?> exitPlan(@Parameter(name = "code") @RequestBody UUID code) {

        String id = memberUtil.getMemberIdFromPrincipal();

        planService.exit(id, code);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
