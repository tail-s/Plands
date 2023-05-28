package com.ssafy.common.db.repository;

import com.ssafy.common.db.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findById(String id);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByIdOrEmail(String id, String email);
    Optional<Member> findByIdAndEmail(String id, String email);
    Page<Member> findAllBy(PageRequest pageRequest);
    Member save(Member member);
    void deleteById(String id);
}
