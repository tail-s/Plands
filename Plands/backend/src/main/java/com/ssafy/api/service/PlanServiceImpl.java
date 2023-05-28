package com.ssafy.api.service;

import com.ssafy.common.db.dto.request.PlanCreateReqDto;
import com.ssafy.common.db.dto.response.PlanDto;
import com.ssafy.common.db.entity.Member;
import com.ssafy.common.db.entity.Plan;
import com.ssafy.common.db.entity.Planner;
import com.ssafy.common.db.repository.MemberRepository;
import com.ssafy.common.db.repository.PlanRepository;
import com.ssafy.common.db.repository.PlanerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService{

    private final MemberRepository memberRepository;

    private final PlanRepository planRepository;

    private final PlanerRepository planerRepository;

    @Override
    @Transactional
    public void create(String leader, PlanCreateReqDto planCreateReqDto) {

        Plan plan = new Plan();
        plan.setTitle(planCreateReqDto.getTitle());

        // JPA 연관관계 매핑을 위해 조회하여 저장
        Optional<Member> memberOptional = memberRepository.findById(leader);
        Member member = memberOptional.get();

        Planner planner = new Planner();

        planner.setPlan(plan);
        plan.getPlanners().add(planner);

        planner.setMember(member);
        member.getPlanners().add(planner);

        plan.setMember(member);
        member.getPlans().add(plan);

        // cascade 로 인해 연관관계 엔티티 자동 저장
        planRepository.save(plan);
    }

    @Override
    @Transactional
    public void join(String id, UUID code) {

        Optional<Member> memberOptional = memberRepository.findById(id);
        Optional<Plan> planOptional = planRepository.findById(code);

        Member member = memberOptional.get();
        Plan plan = planOptional.get();

        Optional<Planner> planerOptional = planerRepository.findByMemberAndPlan(member, plan);

        if(!planerOptional.isPresent()) {

            Planner planner = new Planner();

            planner.setPlan(plan);
            plan.getPlanners().add(planner);

            planner.setMember(member);
            member.getPlanners().add(planner);

            planerRepository.save(planner);
        }
    }

    @Override
    @Transactional
    public List<PlanDto> findAll(String id, int offset, int size) {

        Optional<Member> optional = memberRepository.findById(id);
        Member member = optional.get();

        List<PlanDto> planDtoList = new ArrayList<>();
        List<Planner> joinPlanList = planerRepository.findAllByMemberOrderByRegistDateDesc(member, PageRequest.of(offset, size)).toList();

        for(int i = 0; i < joinPlanList.size(); i++) {

            Planner planner = joinPlanList.get(i);
            Plan plan = planner.getPlan();

            PlanDto planDto = new PlanDto();

            planDto.setCode(plan.getCode());
            planDto.setTitle(plan.getTitle());
            planDto.setRegistDate(plan.getRegistDate());
            planDtoList.add(planDto);
        }

        return planDtoList;
    }

    @Override
    @Transactional
    public int getSize(String id) {

        Optional<Member> optional = memberRepository.findById(id);
        Member member = optional.get();

        final int SIZE_PER_SINGLE_PAGE = 6;

        int totalSize = planerRepository.countByMember(member);
        int divSize = totalSize / SIZE_PER_SINGLE_PAGE;

        int pageSize = (totalSize % SIZE_PER_SINGLE_PAGE == 0 && totalSize != 0) ? divSize : divSize + 1;

        return pageSize;
    }

    @Override
    @Transactional
    public void delete(String leader, UUID code) {

        Optional<Member> optional = memberRepository.findById(leader);
        Member member = optional.get();

        // cascade로 인해 엔티티 삭제 시 연관관계 삭제 불필요
        planRepository.deleteByMemberAndCode(member, code);
    }

    @Override
    @Transactional
    public boolean discernIsLeader(String id, UUID code) {

        Optional<Member> memberOptional = memberRepository.findById(id);
        Member member = memberOptional.get();

        Optional<Plan> planOptional = planRepository.findByMemberAndCode(member, code);

        return planOptional.isPresent();
    }

    @Override
    @Transactional
    public void exit(String id, UUID code) {

        Optional<Member> memberOptional = memberRepository.findById(id);
        Member member = memberOptional.get();

        Optional<Plan> planOptional = planRepository.findByCode(code);
        Plan plan = planOptional.get();

        planerRepository.deleteByMemberAndPlan(member, plan);
    }
}
