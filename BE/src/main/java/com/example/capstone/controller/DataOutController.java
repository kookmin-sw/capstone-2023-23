package com.example.capstone.controller;


import com.example.capstone.dto.AverageLogDto;
import com.example.capstone.dto.LogDto;
import com.example.capstone.entity.CalendarDto;
import com.example.capstone.service.CalendarService;
import com.example.capstone.service.dataout.SoilLogService;
import com.example.capstone.service.dataout.TemperatureLogService;
import com.example.capstone.service.dataout.TotalLogService;
import lombok.Getter;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.capstone.service.dataout.HumidityLogService;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;

@RestController
@RequestMapping("/dataout")
@Getter
public class DataOutController {
    private final TotalLogService totalLogService;
    private final CalendarService calendarService;

    public DataOutController(TotalLogService totalLogService, CalendarService calendarService) {
        this.totalLogService = totalLogService;
        this.calendarService = calendarService;
    }

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@RequestParam("deviceId") int deviceId) throws IOException {
        Path imgPath = Paths.get("/home/ubuntu/Image/" + deviceId + ".jpg");
        byte[] bytes = Files.readAllBytes(imgPath);

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }

    @GetMapping("/imageC")
    public ResponseEntity<String> getImageFromS3(@RequestParam int deviceId , int year , int month, int day) {

        String bucketName = "capstoneimage";

        LocalDateTime now = LocalDateTime.now();
        // 년, 일, 월 입력받음.
        String date = year+"-"+month+"-"+day;

        String keyName =deviceId + "/" + date;

        Region region = Region.AP_NORTHEAST_2;
        S3Client s3 = S3Client.builder().region(region).build();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();

        try {
            InputStream objectData = s3.getObject(getObjectRequest, ResponseTransformer.toInputStream());
            byte[] bytes = IOUtils.toByteArray(objectData);
            String encodedImage = Base64.getEncoder().encodeToString(bytes);

            return ResponseEntity
                    .ok()
                    .body(encodedImage);

        } catch (IOException e) {
            e.printStackTrace();
            // 적절한 오류 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error encoding image");
        }
    }

//    @GetMapping("/average")
//    public AverageLogDto getDto(){
//
//    }




    //"/home/ubuntu/Image/"
//    @GetMapping("/humidity")
//    public ArrayList<DataItem> getHumidity(@RequestParam int deviceId){
//        ArrayList<DataItem> data = humidityLogService.LogEntityToRealTimeData(deviceId);
//        return data;
//    }
//
//    @GetMapping("/temperature")
//    public ArrayList<DataItem> getTemperature(@RequestParam int deviceId){
//        ArrayList<DataItem> data = temperatureLogService.LogEntityToRealTimeData(deviceId);
//        return data;
//    }
//
//    @GetMapping("/soil")
//    public ArrayList<DataItem> getSoil(@RequestParam int deviceId){
//        ArrayList<DataItem> data = soilLogService.LogEntityToRealTimeData(deviceId);
//        return data;
//    }
    @GetMapping("/total")
    public ArrayList<LogDto> getTotal(@RequestParam int deviceId) {
        ArrayList<LogDto> data = totalLogService.getAve(deviceId);
        return data;
    }

    @GetMapping("/marked")
    public ArrayList<String> getMarkedDate(@RequestParam int deviceId, String date){
        // deviceId와 date("yyyy-mm")를 가지고 Calender_object 테이블에 접근, date에 해당하는 row들의 date("yyyy-mm-dd")를 불러옴
        return(calendarService.getMarkedDate(deviceId,date));
    }

    @GetMapping("/record")
    public CalendarDto getDate(int deviceId, String date){
        return(calendarService.getCalendarDto(deviceId,date));
    }
    @GetMapping("/recent")
    public LogDto getRecent(@RequestParam int deviceId){
        return(totalLogService.getRecentRecord(deviceId));
    }


}

