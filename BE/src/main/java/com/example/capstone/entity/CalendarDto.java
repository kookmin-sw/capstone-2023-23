package com.example.capstone.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
public class CalendarDto {
    private double humidity;

    private double temperature;

    private double soilMoisture;
    private String content;

    public CalendarDto(){
        this.humidity = -1;
        this.temperature = -1;
        this.soilMoisture = -1;
        this.content = "";

    }
}
