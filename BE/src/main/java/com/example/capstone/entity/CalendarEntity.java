package com.example.capstone.entity;

import com.example.capstone.dto.LogDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "CalenderObject")
public class CalendarEntity {

    @EmbeddedId
    private LogId id;

    @Column(nullable = false)
    private double humidity;

    @Column(nullable = false)
    private double temperature;

    @Column(nullable = false)
    private double soilMoisture;
    @Column(nullable = true)
    private String content;

}
