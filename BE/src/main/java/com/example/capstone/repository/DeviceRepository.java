package com.example.capstone.repository;

import com.example.capstone.entity.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.LinkedList;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity,Long> {

    public LinkedList<DeviceEntity> findAllByUserId(int userId);

    public DeviceEntity findByDeviceId(int deviceId);
    public String deleteByDeviceId(int deviceId);
    @Query("select d.lightOn from DeviceEntity d where d.deviceId = :deviceId")
    public int findLightConditionByDeviceId(int deviceId);

    @Transactional
    @Modifying
    @Query("UPDATE DeviceEntity e SET e.lightOn = :lightOn WHERE e.deviceId = :deviceId")
    int updateLighton(@Param("deviceId") int deviceId, @Param("lightOn") int lightOn);


    @Query("select d.deviceId from DeviceEntity d")
    public ArrayList<Integer> findAllDeviceId();

}
