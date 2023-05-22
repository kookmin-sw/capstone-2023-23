package com.example.capstone.repository;

import com.example.capstone.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface LogRepository extends JpaRepository<LogEntity,Long> {

//    ArrayList<LogEntity> findAll();
//
    ArrayList<LogEntity> findAllByDeviceId(int deviceid);
    @Query("SELECT l FROM LogEntity l WHERE EXTRACT(HOUR FROM l.logTime) = :hour AND l.deviceId = :deviceId")
    List<LogEntity> findLogsByHourAndDeviceId(@Param("hour") int hour, @Param("deviceId") int deviceId);


//    @Query("SELECT l FROM LogEntity l WHERE l.deviceId = :deviceId ORDER BY l.logTime DESC")
    Optional<LogEntity> findTopByDeviceIdOrderByLogTimeDesc(@Param("deviceId") int deviceId);



}