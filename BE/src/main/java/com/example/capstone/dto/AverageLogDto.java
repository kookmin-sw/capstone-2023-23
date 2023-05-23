package com.example.capstone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AverageLogDto {
    private double humidity;

    private double temperature;

    private double SoilMoisture;

    private int logTime;
}
