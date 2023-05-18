package com.example.capstone.repository;

import com.example.capstone.entity.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity,Long> {

    public LinkedList<DeviceEntity> findAllByUserId(int userId);

    public DeviceEntity findByDeviceId(int deviceId);
    public String deleteByDeviceId(int deviceId);

}
