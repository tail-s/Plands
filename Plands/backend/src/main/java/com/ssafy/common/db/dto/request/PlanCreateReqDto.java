package com.ssafy.common.db.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlanCreateReqDto {

    @Schema(description = "제목", maxLength = 50)
    private String title;

//    @Schema(description = "팀장", maxLength = 16)
//    private String leader;

//    @Schema(description = "시작일", pattern = "YYYY-MM-DD HH:MM:SS")
//    private String startDate;
//
//    @Schema(description = "종료일", pattern = "YYYY-MM-DD HH:MM:SS")
//    private String endDate;

}
