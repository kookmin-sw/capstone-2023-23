package com.example.capstone.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="image_storage")
@AllArgsConstructor
@NoArgsConstructor
public class ImageStorageEntity {
    @Id
    private String path;

    @Column(name = "Device_id")
    private int Device_id;

}
