package com.ssafy.common.db.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PlanDto {

    @Schema(description = "계획 코드")
    private UUID code;

    @Schema(description = "제목", maxLength = 50)
    private String title;

//    @JsonIgnore
    @Schema(description = "등록일", pattern = "YYYY-MM-DD HH:MM:SS")
    private Timestamp registDate;

}

