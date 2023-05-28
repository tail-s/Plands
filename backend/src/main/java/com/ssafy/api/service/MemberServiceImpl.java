package com.ssafy.api.service;

import com.ssafy.common.db.dto.request.MemberLoginReqDto;
import com.ssafy.common.db.dto.request.MemberModifyReqDto;
import com.ssafy.common.db.dto.request.MemberRegistReqDto;
import com.ssafy.common.db.dto.response.MemberDto;
import com.ssafy.common.db.entity.Member;
import com.ssafy.common.db.repository.MemberRepository;
import com.ssafy.common.util.common.MemberUtil;
import com.ssafy.common.util.encoder.PwdEncoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService, UserDetailsService {

    private final MemberRepository memberRepository;

    private final MemberUtil memberUtil;

    private final PwdEncoder pwdEncoder;

    @Override
    @Transactional
    public boolean login(MemberLoginReqDto memberLoginReqDto) {

        Optional<Member> optional = memberRepository.findById(memberLoginReqDto.getId());

        if(optional.isPresent()) {
            Member member = optional.get();

            return memberLoginReqDto.getId().equals(member.getId()) && pwdEncoder.passwordEncoder()
                    .matches(memberLoginReqDto.getPwd(), member.getPassword());
        }
        return false;
    }

    @Override
    @Transactional
    public boolean regist(MemberRegistReqDto memberRegistReqDto) {

        Optional<Member> optional = memberRepository.findByIdOrEmail(memberRegistReqDto.getId(),
                                                                    memberRegistReqDto.getEmail());

        if(!optional.isPresent()) {

            String rawPwd = memberRegistReqDto.getPwd();
            String encodedPwd = pwdEncoder.passwordEncoder().encode(rawPwd);

            memberRegistReqDto.setPwd(encodedPwd);
            memberRepository.save(memberUtil.convToMemberEntity(memberRegistReqDto));
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public MemberDto detail(String id) {

        return memberUtil.convToMemberDto(memberRepository.findById(id).get());
    }

    @Override
    @Transactional
    public List<MemberDto> findAll(int offset, int size) {

        List<MemberDto> memberDtoList = new ArrayList<>();
        List<Member> memberList = memberRepository.findAllBy(PageRequest.of(offset, size)).toList();

        for(int i = 0; i < memberList.size(); i++) {
            memberDtoList.add(memberUtil.convToMemberDto(memberList.get(i)));
        }
        return memberDtoList;
    }

    @Override
    @Transactional
    public boolean findPwd(String email, String id, String newPwd) {

        Optional<Member> optional = memberRepository.findByIdAndEmail(id, email);

        if(optional.isPresent()) {

            Member member = optional.get();
            String encodedPwd = pwdEncoder.passwordEncoder().encode(newPwd);
            member.setPwd(encodedPwd);
            return true;
        }

        return false;
    }

    @Override
    @Transactional
    public void modify(String id, MemberModifyReqDto memberModifyReqDto) {

        Optional<Member> optional = memberRepository.findById(id);

        Member member = optional.get();

        member.setName(memberModifyReqDto.getName());
        member.setNickname(memberModifyReqDto.getNickname());
        member.setGender(memberModifyReqDto.getGender());
        member.setBirthDay(memberModifyReqDto.getBirthDay());
        member.setPNumber(memberModifyReqDto.getPNumber());

        // 자동 감지로 인해 save 메소드 안써도 됨
         memberRepository.save(member);
    }

    @Override
    @Transactional
    public void delete(String id) { memberRepository.deleteById(id); }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return memberRepository.getReferenceById(username);
    }

    @Override
    @Transactional
    public String findId(String email) {

        Optional<Member> optional = memberRepository.findByEmail(email);

        if(optional.isPresent()) {

            String id = optional.get().getId();
            int idx = id.length() - 1;

            StringBuilder stringBuilder = new StringBuilder(id);

            stringBuilder.setCharAt(idx--, '*');
            stringBuilder.setCharAt(idx--, '*');
            stringBuilder.setCharAt(idx--, '*');
            stringBuilder.setCharAt(idx, '*');

            return stringBuilder.toString();
        }

        return null;
    }

    @Override
    @Transactional
    public boolean modifyPwd(String id, String inputPwd, String newPwd) {

        Optional<Member> optional = memberRepository.findById(id);

        Member member = optional.get();

        if(pwdEncoder.passwordEncoder().matches(inputPwd, member.getPassword())) {

            member.setPwd(pwdEncoder.passwordEncoder().encode(newPwd));

            // 자동 감지로 인해 save 메소드 안써도 됨
            memberRepository.save(member);

            return true;
        }

        return false;
    }

    @Override
    @Transactional
    public boolean checkId(String id) {

        Optional<Member> optional = memberRepository.findById(id);

        if(optional.isPresent()) {
            return true;
        }

        return false;
    }

    @Override
    @Transactional
    public boolean checkEmail(String email) {

        Optional<Member> optional = memberRepository.findByEmail(email);

        if(optional.isPresent()) {
            return true;
        }

        return false;
    }
}
