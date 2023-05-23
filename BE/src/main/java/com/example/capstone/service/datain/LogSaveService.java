package com.example.capstone.service.datain;

import com.example.capstone.entity.LogEntity;
import com.example.capstone.repository.EnvironmentLogRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LogSaveService {

    EnvironmentLogRepository environmentLogRepository;
    LogSaveService(EnvironmentLogRepository e){
        this.environmentLogRepository = e;
    }

    public ResponseEntity<String> logSave(LogEntity logEntity){
        // jpa로 저장.
        try{
            environmentLogRepository.saveAndFlush(logEntity);

            System.out.println("success");
            return ResponseEntity.ok("Data successfully saved.");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save data.");
        }
    }
}