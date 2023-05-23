package com.example.capstone.service;

import com.example.capstone.repository.MemberRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class PushNotificationService {

    MemberRepository memberRepository;
    PushNotificationService(MemberRepository m){
        this.memberRepository = m;
    }

    public void sendPushNotification(String expoPushToken) {
        String url = "https://exp.host/--/api/v2/push/send";

        // Create a HttpHeaders object and set the content type to application/json
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the request body as a Map
        Map<String, Object> body = new HashMap<>();
        body.put("to", "ExponentPushToken[ugDSnMGW3tJoRlf1P_bPRM]");
        body.put("title", "알림 테스트2");
        body.put("body", "이제 그만 하고싶어요2!");

        // Create a HttpEntity object that wraps the request body and headers
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Use the RestTemplate to send the request
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("aaaaaa");
        restTemplate.postForEntity(url, requestEntity, String.class);
        System.out.println("bbbbbb");

    }
}
