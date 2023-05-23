package com.example.capstone.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class member {

    private String email;
    private String pw;
    private String firstname;
    private String lastname;
    private String token;

}
