package com.example.capstone.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class RealtimeData {
    private String id;
    private String color;
    private ArrayList<DataItem> data;

    public RealtimeData() {
        data = new ArrayList<DataItem>();
    }


    public void AddData(DataItem dataItem){
        data.add(dataItem);
    }



}