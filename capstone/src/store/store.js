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

//4. User Info
let user = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    updateUser(state, action) {
      return action.payload;
    },
  },
});
//5. Booth info  (addModal하면 생기는?)
let boothSlice = createSlice({
  name: 'booth',
  initialState: {
    boothName: '',
    boothSerialNumber: '',
  },
  reducers: {
    setBoothName: (state, action) => {
      state.boothName = action.payload;
    },
    setBoothSerialNumber: (state, action) => {
      state.boothSerialNumber = action.payload;
    },
  },
});

//6. Booth Delete Event (checkBox, deleteBooth)
let checkedBooth = createSlice({
  name: 'checked',
  initialState: {
    checkedBooths: '',
  },
  //checkedBooths는 현재 배열이므로 아래 reducer함수로 상태 관리
  //아래 코드 setCheckedBooths 액션은 checkedBooths 배열에 특정 id를 추가하거나 삭제
  reducers: {
    setCheckedBooths: (state, action) => {
      state.checkedBooths = action.payload;
      const checkedId = action.payload;

      if (state.checkedBooths.includes(checkedId)) {
        state.checkedBooths = state.checkedBooths
          .split(',')
          .filter((id) => id !== checkedId)
          .join(',');
      } else {
        state.checkedBooths = state.checkedBooths
          ? state.checkedBooths + ',' + checkedId
          : checkedId;
      }
    },
  },
});

let deleteBooth = createSlice({
  name: 'delete',
  initialState: {
    deleteList: [],
  },
  reducers: {
    //삭제된 부스의 id를 배열에 넣음
    deleteBoothReducer: (state, action) => {
      state.deleteList.push(action.payload);
    },
  },
});

//7. plant info, event

//Booth2.js에 cardContent를 클릭할 시 해당 부스 정보 저장하는
let boothCookie = createSlice({
  name: 'boothCookie',
  initialState: {
    boothCookieName: '',
    boothCookieSerialNumber: '',
  },
  reducers: {
    setBoothCookieName: (state, action) => {
      state.boothCookieName = action.payload;
    },
    setBoothCookieSerialNumber: (state, action) => {
      state.boothCookieSerialNumber = action.payload;
    },
  },
});

let plantSlice = createSlice({
  name: 'plant',
  initialState: {
    plantName: '',
    plantSpecies: '',
    plantSerialNumber: '',
    firstHumidity: '',
    firstSoilMoisture: '',
    firstTemperature: '',
  },
  reducers: {
    setPlantName: (state, action) => {
      state.plantName = action.payload;
    },
    setPlantSerialNumber: (state, action) => {
      state.plantSerialNumber = action.payload;
    },
    setPlantSpecies: (state, action) => {
      state.plantSpecies = action.payload;
    },
    setFirstHumidity: (state, action) => {
      state.firstHumidity = action.payload;
    },
    setFirstSoilMoisture: (state, action) => {
      state.firstSoilMoisture = action.payload;
    },
    setFirstTemperature: (state, action) => {
      state.firstTemperature = action.payload;
    },
  },
});

//plant delete event
let deletePlant = createSlice({
  name: 'deletePlant',
  initialState: {
    deletePlantList: [],
  },
  reducers: {
    //삭제된 부스의 id를 배열에 넣음
    deletePlantReducer: (state, action) => {
      state.deletePlantList.push(action.payload);
    },
  },
});
let checkedPlant = createSlice({
  name: 'checkedPlant',
  initialState: {
    checkedPlant: [],
  },
  //checkedBooths는 현재 배열이므로 아래 reducer함수로 상태 관리
  //아래 코드 setCheckedBooths 액션은 checkedBooths 배열에 특정 id를 추가하거나 삭제
  reducers: {
    setCheckedPlant: (state, action) => {
      const checkedId = action.payload;

      if (state.checkedPlant.includes(checkedId)) {
        state.checkedPlant = state.checkedPlant.filter(
          (id) => id !== checkedId
        );
      } else {
        state.checkedPlant.push(checkedId);
      }
    },
  },
});

//reducer, state 등록, {작명: createSlice만든거.reducer} 하면 등록 끝
export default configureStore({
  reducer: {
    soilMoisture: soilMoisture.reducer,
    temp: temp.reducer,
    humidity: humidity.reducer,
    user: user.reducer,
    booth: boothSlice.reducer,
    boothCookie: boothCookie.reducer,
    plant: plantSlice.reducer,
    deleteBooth: deleteBooth.reducer,
    checkedBooth: checkedBooth.reducer,
    checkedPlant: checkedPlant.reducer,
    deletePlant: deletePlant.reducer,
  },
});

export const { updateSoil } = soilMoisture.actions;
export const { updateTemp } = temp.actions;
export const { updateHumidity } = humidity.actions;
export const { updateUser } = user.actions;
export const { setBoothName, setBoothSerialNumber } = boothSlice.actions;
export const { setBoothCookieName, setBoothCookieSerialNumber } =
  boothCookie.actions;
export const {
  setPlantName,
  setPlantSerialNumber,
  setPlantSpecies,
  setFirstHumidity,
  setFirstSoilMoisture,
  setFirstTemperature,
} = plantSlice.actions;
export const { deleteBoothReducer } = deleteBooth.actions;
export const { deletePlantReducer } = deletePlant.actions;
export const { setCheckedBooths } = checkedBooth.actions;
export const { setCheckedPlant } = checkedPlant.actions;
