package com.ssafy.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberPwdReqDto {

    @Schema(description = "아이디", example = "ssafy", maxLength = 16)
    private String id;

    @Schema(description = "이메일", example = "ssafy@naver.com", maxLength = 100)
    private String email;

}
