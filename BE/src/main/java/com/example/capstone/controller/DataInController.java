package com.example.capstone.controller;

import com.example.capstone.entity.CalendarEntity;
import com.example.capstone.entity.LogEntity;
import com.example.capstone.entity.LogId;
import com.example.capstone.repository.CalendarRepository;
import com.example.capstone.service.CalendarService;
import com.example.capstone.service.datain.ImageInService;
import com.example.capstone.service.datain.LogSaveService;
import com.google.type.DateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/datain")
public class DataInController {
    public final ImageInService imageInService;
    public final LogSaveService logSaveService;
    public final CalendarService s;

    public DataInController(ImageInService ii,LogSaveService logSaveService, CalendarService s){
        this.imageInService = ii;
        this.logSaveService = logSaveService;
        this.s = s;

    }

    // 1. 이미지를 받는다
    // 2. 폴더에 저장한다
    // 3. 저장되는 이미지의 파일명은 날짜+시간+deviceId
    // 4. db에 저장된 파일의 path를 저장한다.
        @PostMapping("/image")
        public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file , int deviceId ) {

            System.out.println(file);
            System.out.println(deviceId);
            int d = LocalDateTime.now().getHour();
            String message = imageInService.ImageSave(file, deviceId);

            LocalDateTime now = LocalDateTime.now();
            String year = String.valueOf(now.getYear());
            String month = String.valueOf(now.getMonthValue());
            String day = String.valueOf(now.getDayOfMonth());
            String date = year+"-"+month+"-"+day;


            if(d >= 0){
                imageInService.uploadImageToS3("capstoneimage",deviceId+"/"+date,"/home/ubuntu/Image/"+deviceId+".jpg");
            }
            if (message == "Fail"){
                return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else{
                return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
            }

        }

        @PostMapping("/hourlog")
        public ResponseEntity<String> postData(@RequestBody EnvironmentData environmentData) {
            try {
                System.out.println(environmentData.getDeviceId());
                System.out.println();
                // 데이터 저장
                LogEntity log = new LogEntity();
                log.setTemperature(environmentData.getTemperature());
                log.setHumidity(environmentData.getHumidity());
                log.setSoilMoisture(environmentData.getSoilMoisture());
                log.setDeviceId(environmentData.getDeviceId());
                log.setLogTime(LocalDateTime.now());
                System.out.println(log.toString());
                logSaveService.logSave(log);
                // 응답
                return ResponseEntity.ok("Data successfully saved.");
            } catch (Exception e) {
                // 에러 발생 시 응답
                System.out.println(e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save data.");
            }
        }
        @PatchMapping("/content")
        public String setContent(@RequestParam int deviceId , String date , String content){
            s.PatchDate(deviceId,date,content);
            return (content);
        }
}


@Getter
@Setter
class EnvironmentData{
    private double humidity;
    private double temperature;
    private double soilMoisture;
    private int deviceId;
}
