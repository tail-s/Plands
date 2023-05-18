package com.ssafy.common.db.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class TokenDto {

    @Schema(description = "회원 이름")
    private String id;

    @Schema(description = "토큰 값")
    private String value;

    @Schema(description = "유효기간")
    private long validDate;

    @Schema(description = "만료기한")
    private Timestamp expireDate;
}
