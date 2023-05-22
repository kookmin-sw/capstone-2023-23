package com.example.capstone.repository;

import com.example.capstone.entity.CalendarEntity;
import com.example.capstone.entity.LogId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarRepository extends JpaRepository<CalendarEntity, LogId> {
    // 날짜 , device Id 를 입력하면 해당 날짜의 평균 데이터를 제공할 수 있어야함

    // 월 데이터를 입력하면 해당 월의 모든 데이터를 제공할 수 있어야함.

    List<CalendarEntity> findByIdDeviceId(int deviceId);

}
