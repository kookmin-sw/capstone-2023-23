package com.example.capstone.entity;

import com.example.capstone.entity.BaseTimeEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity(name = "session_member")
public class SessionEntity extends BaseTimeEntity {
    @Id
    private String session_id;

    @Column(name = "member_id")
    private int member_id;

    @Column(name = "expired_date")
    private LocalDateTime expired_date;
}
