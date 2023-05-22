package com.example.capstone.controller;

import com.example.capstone.dto.DeviceDto;
import com.example.capstone.service.DeviceRegisterService;
import com.example.capstone.service.DeviceManageService;
import com.example.capstone.service.PushNotificationService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    private final DeviceRegisterService deviceRegisterService;
    private final DeviceManageService deviceManageService;
    private final PushNotificationService pushNotificationService;

    DeviceController(DeviceRegisterService d, DeviceManageService s , PushNotificationService p){
        this.deviceRegisterService = d;
        this.deviceManageService = s;
        this.pushNotificationService = p;
    }

    // 새로운 부스를 등록함.
    @PostMapping("/register/newdevice")
    public String RegisterDevice(@RequestBody Device d) {
        System.out.println(d.getDeviceId());
        System.out.println(d.getDeviceName());
        System.out.println(d.getUserId());


        //service 호출
        deviceRegisterService.RegistDevice(d.getDeviceId(),d.getUserId(),d.getDeviceName());
        return "success";
    }
    // 부스를 삭제함
    @GetMapping("/remove")
    public String RemoveDevice(@RequestParam int deviceId){
        deviceManageService.RemoveDevice(deviceId);
        return "success";
    }
    // 새로운 식물을 부스에 등록함.
    @PatchMapping("/register/plant" )
    public DeviceDto AddPlant(@RequestBody  DeviceDto d){
        return deviceManageService.AddPlant(d);
    }
    // 관리중인 식물 제거
    @PatchMapping("/remove/plant")
    public String RemovePlant(@RequestParam int deviceId){
        return deviceManageService.RemovePlant(deviceId);
    }
    // 유저의 모든 디바이스 정보 불러옴
    @GetMapping("/load/all")
    public List<DeviceDto> LoadAllDevice(@RequestParam int userId){
        return(deviceManageService.LoadAllDevice(userId));
    }
    // 유저의 특정 디바이스 정보를 불러옴.
    @GetMapping("/load/one")
    public DeviceDto LoadOneDevice(@RequestParam int deviceId){
        return(deviceManageService.LoadOneDevice(deviceId));
    }
    @PatchMapping("/turnon")
    public void TurnOnLight(@RequestParam int deviceId){
        deviceManageService.SetLight(deviceId);
    }
    @GetMapping("/push/anomal")
    public void Pushnotification(){
        pushNotificationService.sendPushNotification("");
    }

}


@Getter
@Setter
class Device{
    private int userId;
    private int deviceId;
    private String deviceName;


}
