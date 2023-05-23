package com.example.capstone.service.dataout;

import com.example.capstone.controller.DataItem;
import com.example.capstone.controller.RealtimeData;
import com.example.capstone.entity.LogEntity;
import com.example.capstone.repository.LogRepository;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Getter
public class HumidityLogService {
    private final LogRepository logRepository;
    //LogDataOutService
    public HumidityLogService (LogRepository l){this.logRepository = l;}
    public ArrayList<DataItem> LogEntityToRealTimeData(int deviceid){
        ArrayList<LogEntity> a = logRepository.findAllByDeviceId(deviceid);
        RealtimeData ans = new RealtimeData();


        for(int i=0; i<a.size();i++){
            LogEntity exist = a.get(i);
            DataItem s = new DataItem(exist.getLogTime().getHour(),exist.getHumidity());
            ans.AddData(s);
        }
        return ans.getData();
    }
}