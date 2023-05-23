package com.example.capstone.service.dataout;

import com.example.capstone.controller.DataItem;
import com.example.capstone.controller.RealtimeData;
import com.example.capstone.dto.LogDto;
import com.example.capstone.entity.LogEntity;
import com.example.capstone.repository.LogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TotalLogService {

    private final LogRepository logRepository;
    //LogDataOutService
    public TotalLogService (LogRepository l){this.logRepository = l;}


    public ArrayList<LogDto> LogEntityToRealTimeData(int deviceid){
        ArrayList<LogEntity> a = logRepository.findAllByDeviceId(deviceid);
        ArrayList<LogDto> ans = new ArrayList<>();

        for(int i=0; i<a.size();i++){
            ans.add(a.get(i).EntityToDto());
        }
        return ans;
    }

    public ArrayList<LogDto> getAve(int deviceId) {
        // deviceId로 해당 기기의 모든 로그 불러옴
        ArrayList<LogEntity> logList = logRepository.findAllByDeviceId(deviceId);

        // 초기화
        // 0~23의 시간을 갖는 LogDto list 생성
        ArrayList<LogDto> ans = new ArrayList<>();
        int[] counts = new int[24]; // Count for each hour
        double[] totalHumidity = new double[24];
        double[] totalSoilMoisture = new double[24];
        double[] totalTemperature = new double[24];
        for(int hour=0; hour <24; hour++){
            ans.add(new LogDto(0,0,0,hour));
            counts[hour] = 0;
            totalHumidity[hour] = 0;
            totalSoilMoisture[hour] = 0;
            totalTemperature[hour] = 0;
        }

        // for문 돌면서
        for(int i=0; i<logList.size(); i++){
            LogEntity log = logList.get(i);

            int hour = log.getLogTime().getHour();
            totalHumidity[hour] += log.getHumidity();
            totalSoilMoisture[hour] += log.getSoilMoisture();
            totalTemperature[hour] += log.getTemperature();
            counts[hour]++;
        }
        for(int hour=0; hour < 24; hour++) {
            if(counts[hour] > 0) { // To avoid division by zero (if there exist data)
                LogDto dto = ans.get(hour);
                dto.setHumidity(totalHumidity[hour] / counts[hour]);
    //            dto.setHumidity(Math.floor((totalHumidity[hour] / counts[hour])*100) / 100);
                dto.setSoilMoisture(totalSoilMoisture[hour] / counts[hour]);
                dto.setTemperature(totalTemperature[hour] / counts[hour]);
            }
        }

        return ans;
    }

    public LogDto getRecentRecord(int deviceId){
       Optional<LogEntity> record = logRepository.findTopByDeviceIdOrderByLogTimeDesc(deviceId);

       if(record.isPresent()){
           LogEntity f = record.get();
           System.out.println(f.getLogTime());
           return f.EntityToDto();
       }
       else{
           return (new LogDto(0,0,0,0));
       }
    }

}
