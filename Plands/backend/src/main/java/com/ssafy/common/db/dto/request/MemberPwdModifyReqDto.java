package com.ssafy.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberPwdModifyReqDto {

    @Schema(description = "사용자 입력 비밀번호", example = "ssafy", maxLength = 16)
    private String inputPwd;

    @Schema(description = "새 비밀번호", example = "new_ssafy", maxLength = 16)
    private String newPwd;

}
