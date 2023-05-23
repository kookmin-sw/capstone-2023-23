package com.example.capstone.service;

import com.example.capstone.controller.Member;
import com.example.capstone.entity.MemberEntity;
import com.example.capstone.repository.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberAuthenticationCheckService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    MemberAuthenticationCheckService(MemberRepository m, BCryptPasswordEncoder passwordEncoder){
        this.memberRepository = m;
        this.passwordEncoder = passwordEncoder;
    }

    public int CheckAuthentication(String email , String pw) {
        MemberEntity member = memberRepository.findByEmail(email);
        if (member != null && passwordEncoder.matches(pw, member.getPw())){
            return 1;
        } else{
            return 0;
        }
    }

    public Member loadMember(String email, String pw){
        MemberEntity member = memberRepository.findByEmail(email);
        if (member != null && passwordEncoder.matches(pw, member.getPw())) {
            Member rtn = member.EntityToMember();
            rtn.setId(member.getId());
            rtn.setPw("비공개");
            return rtn;
        }
        return null;
    }

}
