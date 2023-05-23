package com.example.capstone.service;

import com.example.capstone.entity.DeviceEntity;
import com.example.capstone.entity.MemberEntity;
import com.example.capstone.repository.DeviceRepository;
import com.example.capstone.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class DeviceRegisterService {

    private final DeviceRepository deviceRepository;
    private final MemberRepository memberRepository;

    DeviceRegisterService(DeviceRepository d, MemberRepository m){
        this.deviceRepository = d;
        this.memberRepository = m;
    }

    public void RegistDevice(int deviceId , int userId, String deviceName){
        MemberEntity member = memberRepository.findById(userId);
        DeviceEntity device = new DeviceEntity(deviceId,member,deviceName);
        deviceRepository.save(device);
    }
}
