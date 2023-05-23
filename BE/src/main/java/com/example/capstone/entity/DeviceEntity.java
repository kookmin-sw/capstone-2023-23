package com.example.capstone.entity;
import com.example.capstone.dto.DeviceDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "device")
public class DeviceEntity {

    @Id
    @Column(name="deviceId")
    private int deviceId;
    @Column(name="deviceName")
    private String deviceName;

    @JoinColumn(name = "userId")
    @ManyToOne
    private MemberEntity user;

    @Column(name = "plantName", nullable = true)
    private String plantName;

    @Column(name = "plantSpecies", nullable = true)
    private String plantSpecies;

    @Column(name = "humidity",nullable = true)
    private double humidity;

    @Column(name = "temperature", nullable = true)
    private double temperature;

    @Column(name = "soilMoisture", nullable = true)
    private double soilMoisture;

    @Column(name = "lightOn")
    private int lightOn = 0;


    public DeviceEntity(int deviceId, MemberEntity user, String deviceName){
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.user = user;
    }

    public DeviceEntity() {

    }

    public DeviceDto EntityToDto(){
        DeviceDto dto = new DeviceDto();

        dto.setDeviceId(this.deviceId);
        dto.setDeviceName(this.deviceName);
        dto.setPlantName(this.plantName);
        dto.setPlantSpecies(this.plantSpecies);
        dto.setSoilMoisture(this.soilMoisture);
        dto.setTemperature(this.temperature);
        dto.setHumidity(this.humidity);

        return dto;

    }
}