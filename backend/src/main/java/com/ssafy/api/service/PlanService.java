package com.ssafy.api.service;

import com.ssafy.common.db.dto.request.PlanCreateReqDto;
import com.ssafy.common.db.dto.response.PlanDto;
import com.ssafy.common.db.entity.Member;

import java.util.List;
import java.util.UUID;

public interface PlanService {

    void create(String leader, PlanCreateReqDto planCreateReqDto);
    void join(String id, UUID code);
    List<PlanDto> findAll(String id, int offset, int size);
    int getSize(String id);
    void delete(String leader, UUID code);
    boolean discernIsLeader(String id, UUID code);
    void exit(String id, UUID code);
}
