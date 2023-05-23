package com.example.capstone.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class DeviceLogEntity {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deviceID;
    private LocalDateTime datetime;
    @Column
    private String lux;
    @Column
    private String moist;
    @Column
    private String temp;
}