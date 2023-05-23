package com.example.capstone.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
@JsonAutoDetect
public class DeviceDto {

    private int deviceId;
    private String deviceName;
    private String plantName;
    private String plantSpecies;
    private double humidity;
    private double temperature;
    private double soilMoisture;

}
