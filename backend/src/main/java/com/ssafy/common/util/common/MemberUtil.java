package com.ssafy.common.util.common;

import com.ssafy.common.db.dto.request.MemberRegistReqDto;
import com.ssafy.common.db.dto.response.MemberDto;
import com.ssafy.common.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberUtil {

    // 다른 변환이 필요한 경우 오버로딩해서 사용
    public Member convToMemberEntity(MemberRegistReqDto memberRegistReqDto) {
        // registDate 제외
        Member member = Member.builder()
                .id(memberRegistReqDto.getId())
                .pwd(memberRegistReqDto.getPwd())
                .name(memberRegistReqDto.getName())
                .nickname(memberRegistReqDto.getNickname())
                .gender(memberRegistReqDto.getGender())
                .birthDay(memberRegistReqDto.getBirthDay())
                .pNumber(memberRegistReqDto.getPNumber())
                .email(memberRegistReqDto.getEmail())
                .build();

        // 권한정보 설정
        List<String> roles = new ArrayList<>();
        roles.add("User");
        member.setRoles(roles);

        return member;
    }

    public MemberDto convToMemberDto(Member member) {

        return new MemberDto(member.getId(), member.getName(),
                member.getNickname(), member.getGender(), member.getBirthDay(),
                member.getPNumber(), member.getEmail(), member.getRegistDate());
    }

    public String getMemberIdFromPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        String username = userDetails.getUsername();

        return username;
    }

}