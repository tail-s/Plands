package com.ssafy.common.db.repository;

import com.ssafy.common.db.entity.Member;
import com.ssafy.common.db.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlanRepository extends JpaRepository<Plan, UUID> {

    Plan save(Plan plan);
    Optional<Plan> findByCode(UUID code);
    void deleteByMemberAndCode(Member member, UUID code);
    Optional<Plan> findByMemberAndCode(Member member, UUID code);
}
