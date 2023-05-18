package com.ssafy.common.db.repository;

import com.ssafy.common.db.entity.Member;
import com.ssafy.common.db.entity.Plan;
import com.ssafy.common.db.entity.Planner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlanerRepository extends JpaRepository<Planner, UUID> {

    Planner save(Planner planner);
    Optional<Planner> findByMemberAndPlan(Member member, Plan plan);
    Page<Planner> findAllByMemberOrderByRegistDateDesc(Member member, PageRequest pageRequest);
    int countByMember(Member member);
    void deleteByMemberAndPlan(Member member, Plan plan);
}
