import { configureStore, createSlice } from '@reduxjs/toolkit';

//1. soilMoisture
//usetState()의 역할, {name:'state이름',initialState:'state값'} 하면 state 하나 생성
let soilMoisture = createSlice({
  name: 'soilMoisture',
  initialState: '',

  //state 수정해주는 함수(액션 생성자 함수)를 아래 적기
  reducers: {
    updateSoil(state, action) {
      return action.payload;
    },
  },
});

//2. Temperature
let temp = createSlice({
  name: 'temp',
  initialState: '',
  reducers: {
    updateTemp(state, action) {
      return action.payload;
    },
  },
});

//3. Temperature
let humidity = createSlice({
  name: 'humidity',
  initialState: '',
  reducers: {
    updateHumidity(state, action) {
      return action.payload;
    },
  },
});

//reducer, state 등록, {작명: createSlice만든거.reducer} 하면 등록 끝
export default configureStore({
  reducer: {
    soilMoisture: soilMoisture.reducer,
    temp: temp.reducer,
    humidity: humidity.reducer,
  },
});

export const { updateSoil } = soilMoisture.actions;
export const { updateTemp } = temp.actions;
export const { updateHumidity } = humidity.actions;
