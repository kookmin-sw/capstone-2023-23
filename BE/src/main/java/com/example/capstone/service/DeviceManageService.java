package com.example.capstone.service;

import com.example.capstone.dto.DeviceDto;
import com.example.capstone.entity.DeviceEntity;
import com.example.capstone.repository.DeviceRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;

@Service
public class DeviceManageService {

    private final DeviceRepository deviceRepository;

    DeviceManageService(DeviceRepository d){
        this.deviceRepository = d;
    }

    //이용자의 모든 부스 정보를 가져옴
    public List<DeviceDto> LoadAllDevice(int userId){
        LinkedList<DeviceEntity> a = deviceRepository.findAllByUserId(userId);

        List<DeviceDto> rtn = new LinkedList<DeviceDto>();
        //for문 돌면서 deviceEntity를 Dto로 변환, 새로운 리스트에 담음
        for(int i =0; i< a.size(); i++){
            System.out.println(a.get(i).getDeviceId());
            rtn.add(a.get(i).EntityToDto());
            System.out.println(rtn.get(i).getDeviceId());
        }
        return rtn;
    }

    // 특정 부스를 조회함
    public DeviceDto LoadOneDevice(int deviceId){
        DeviceEntity device = deviceRepository.findByDeviceId(deviceId);

        DeviceDto rtn = device.EntityToDto();

        return rtn;
    }
    // 부스를 삭제함
    @Transactional
    public void RemoveDevice(int deviceId){
        deviceRepository.deleteByDeviceId(deviceId);
    }


    // 관리할 식물을 부스에 등록함.
    public DeviceDto AddPlant(DeviceDto d){
        int deviceId = d.getDeviceId();

        DeviceEntity device = deviceRepository.findByDeviceId(deviceId);

        device.setPlantName(d.getPlantName());
        device.setPlantSpecies(d.getPlantSpecies());
        device.setTemperature(d.getTemperature());
        device.setHumidity(d.getHumidity());
        device.setSoilMoisture(d.getSoilMoisture());

        deviceRepository.save(device);
        return(device.EntityToDto());
    }

    // 관리중인 식물을 부스에서 제거함.
    public String RemovePlant(int deviceId){
        DeviceEntity device = deviceRepository.findByDeviceId(deviceId);

        device.setPlantName(null);
        device.setPlantSpecies(null);
        device.setTemperature(0);
        device.setHumidity(0);
        device.setSoilMoisture(0);

        deviceRepository.save(device);
        return "success";
    }

    public void SetLight(int deviceId){
        int condition = deviceRepository.findLightConditionByDeviceId(deviceId);
        if(condition == 0){
            deviceRepository.updateLighton(deviceId,1);
        }
        else{
            deviceRepository.updateLighton(deviceId,0);

        }
    }
}
