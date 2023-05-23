package com.example.capstone.service;

import com.example.capstone.entity.CalendarDto;
import com.example.capstone.entity.CalendarEntity;
import com.example.capstone.entity.LogId;
import com.example.capstone.repository.CalendarRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {
    private final CalendarRepository calendarRepository;

    CalendarService(CalendarRepository l){
        this.calendarRepository = l;
    }

    public ArrayList<String> getMarkedDate(int deviceId, String date){
        List<CalendarEntity> arr = calendarRepository.findByIdDeviceId(deviceId);
        ArrayList<String> dates = new ArrayList<>();

        System.out.println("input date=" + date);
        System.out.println("Marked Date:");
        for(int i=0; i<arr.size(); i++){
            //객체의 날짜 데이터를 가져와서 년도와 월 까지만 잘라냄. 그리고 date(yyyy-mm)랑 비교.
            String tmp = arr.get(i).getId().getDate();
            // 일치한다면 rtn에 날짜 추가.
            if(tmp.substring(0,7).equals(date)){
                System.out.println(tmp);
                dates.add(tmp);
            }
        }
        return dates;
    }

    public CalendarDto getCalendarDto(int deviceId,String date) {
        LogId id = new LogId(date, deviceId);
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(id);
        System.out.println(calendarEntity.get().getId());
        if (calendarEntity.isPresent()) {
            System.out.println(calendarEntity.get().getId());
            return new CalendarDto(calendarEntity.get().getHumidity(),calendarEntity.get().getHumidity(),calendarEntity.get().getSoilMoisture(),calendarEntity.get().getContent());
        } else {
            return new CalendarDto(); // Returns a DTO with null values
        }
    }

    public String PatchDate(int deviceId, String date,String content){
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(new LogId(date,deviceId));

        CalendarEntity a = calendarEntity.get();
        a.setContent(content);
        calendarRepository.save(a);
        return "done";
    }
}
