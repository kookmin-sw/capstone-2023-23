package com.example.capstone.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    private int id;
    private String email;
    private String pw;
    private String firstname;
    private String lastname;

    public Member(String email, String pw, String firstname, String lastname){
        this.email = email;
        this.pw = pw;
        this.firstname = firstname;
        this.lastname = lastname;

    }

}