package com.example.capstone.repository;

import com.example.capstone.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnvironmentLogRepository extends JpaRepository <LogEntity,Long>{
}
