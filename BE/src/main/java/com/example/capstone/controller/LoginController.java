package com.example.capstone.controller;

import com.example.capstone.service.MemberAuthenticationCheckService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    //두 가지 갈래로 뻗어나갈 것임.
    //첫 번 째는 일반 로그인 => 세션부여
    //두 번 째는 소셜 간편 로그인 => 추후 공부

    //일반 로그인. 첫 로그인 시에는 쿠키로 세션 키를 발급해줌, 이후에 세션 id로 확인.

    private final MemberAuthenticationCheckService memberCheckService;

    LoginController(MemberAuthenticationCheckService mc) {
        this.memberCheckService = mc;
    }

    @PostMapping("/general")
    public Member Login(@RequestBody Member u , HttpServletResponse response, HttpSession session) throws NoSuchAlgorithmException {

        String email = u.getEmail();
        String pw = u.getPw();

        //1.사용자 확인 (id , pw 확인)
        if(memberCheckService.CheckAuthentication(u.getEmail(),u.getPw()) != 0){
            System.out.println("Email : " + u.getEmail());
            System.out.println("PW : " + u.getPw());
            System.out.println("name : " +  u.getFirstname() + u.getLastname());
            System.out.println("로그인 성공");


            u.setId(memberCheckService.CheckAuthentication(email,pw));
            // 쿠키(세션)생성 로직 들어가야함.
            Cookie cookie = new Cookie("memberId",email);
            // 모든 경로에서 쿠키를 사용 할 수 있게 설정.
            // 특정 경로를 설정하면 그 경로에서만 쿠키 이용 가능함.
            cookie.setPath("/");
            // 쿠키의 유효기간 설정. 초 단위이므로 현재 설정값은 1시간
            cookie.setMaxAge(60 * 60);
            // response 메세지에 쿠키 추가.
            response.addCookie(cookie);

        }
        else{
            System.out.println("로그인 실패");
        }
        //3. 세션 등록
        session.setAttribute(email,email);
        return memberCheckService.loadMember(email,pw);
    }
}

