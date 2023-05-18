package com.ssafy.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlanInviteReqDto {

    @Schema(description = "이메일", example = "ssafy@naver.com", maxLength = 100)
    private String email;

    @Schema(description = "초대 링크")
    private String link;

}
