package com.example.capstone.service;

import com.example.capstone.entity.MemberEntity;
import com.example.capstone.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class MemberRegisterService {

    final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    MemberRegisterService(MemberRepository m, BCryptPasswordEncoder passwordEncoder){
        this.memberRepository = m;
        this.passwordEncoder = passwordEncoder;
    }

    public String registerUser(member newUser) {
        MemberEntity existingUser = memberRepository.findByEmail(newUser.getEmail());
        if (existingUser != null) {
            return "Email already exists";
        }

        // Encrypt and hash the password
        String hashedPassword = passwordEncoder.encode(newUser.getPw());

        MemberEntity e = new MemberEntity(newUser.getEmail(), hashedPassword, newUser.getFirstname(), newUser.getLastname(), newUser.getToken());
        memberRepository.save(e);
        return "success";
    }
}