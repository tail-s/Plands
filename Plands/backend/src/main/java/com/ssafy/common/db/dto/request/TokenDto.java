package com.ssafy.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenDto {

    @Schema(description = "토큰 종류")
    private String type;

    @Schema(description = "토큰 값")
    private String value;

    @Schema(description = "만료시간")
    private long expireTime;

}
