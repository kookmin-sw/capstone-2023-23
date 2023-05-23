package com.example.capstone.controller;

import com.example.capstone.service.MemberRegisterService;
import org.springframework.web.bind.annotation.*;
import com.example.capstone.service.member;
@RestController
@RequestMapping("/register")
public class RegisterController {

    final MemberRegisterService memberegisterservice;

    RegisterController(MemberRegisterService m){
        this.memberegisterservice = m;
    }
    @PostMapping("/user")
    public String join(@RequestBody member m){
        System.out.println(m.getEmail());
        System.out.println(m.getPw());
        System.out.println((m.getLastname()));
        System.out.println((m.getFirstname()));

        if(m.getEmail() == null || m.getPw() == null || m.getFirstname() == null || m.getLastname() == null){
            return ("모든 항목을 입력하삼");
        }
        else{
            return memberegisterservice.registerUser(m);
        }
    }
}

