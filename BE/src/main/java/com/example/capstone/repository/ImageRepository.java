package com.example.capstone.repository;

import com.example.capstone.entity.ImageStorageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository <ImageStorageEntity,Long>{

}
