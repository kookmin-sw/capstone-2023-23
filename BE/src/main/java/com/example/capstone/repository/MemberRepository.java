package com.example.capstone.repository;

import com.example.capstone.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity,String> {
    MemberEntity findByEmailAndPw(String email, String pw);
    MemberEntity findByEmail(String email);
    MemberEntity findById(int id);

}