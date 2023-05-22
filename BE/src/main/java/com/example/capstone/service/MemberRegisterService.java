package com.example.capstone.service;

import com.example.capstone.entity.MemberEntity;
import com.example.capstone.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class MemberRegisterService {

    final MemberRepository memberRepository;

    MemberRegisterService(MemberRepository m){
        this.memberRepository = m;
    }

    public String registerUser(member newUser) {
        MemberEntity existingUser = memberRepository.findByEmail(newUser.getEmail());
        if (existingUser != null) {
//            throw new IllegalArgumentException("Email already exists");
            return "Email already exists";
        }

        MemberEntity e = new MemberEntity(newUser.getEmail(), newUser.getPw(), newUser.getFirstname(), newUser.getLastname(),newUser.getToken());
        memberRepository.save(e);
        return "success";
    }

}
