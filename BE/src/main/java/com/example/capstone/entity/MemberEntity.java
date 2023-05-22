package com.example.capstone.entity;


import com.example.capstone.controller.Member;
import com.example.capstone.service.member;
import lombok.*;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "member")
public class MemberEntity extends BaseTimeEntity{

    public  MemberEntity(String email, String pw, String firstname, String lastname,String token){
        this.email = email;
        this.pw = pw;
        this.firstname = firstname;
        this.lastname = lastname;
        this.token = token;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String email;
    @Column
    private String pw;
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    private String token;

    public Member EntityToMember(){
        Member rtn = new Member(this.email,this.pw,this.firstname,this.lastname);
        return rtn;
    }
}