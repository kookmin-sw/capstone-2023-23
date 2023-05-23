import { configureStore, createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    deviceName: "",
    deviceId: "",
  },
  reducers: {
    setDeviceName: (state, action) => {
      state.deviceName = action.payload;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
});

const plantSlice = createSlice({
  name: "plant",
  initialState: {
    plantName: "",
    plantSpecies: "",
    temp: "",
    humidity: "",
    soilMoist: "",
  },
  reducers: {
    setPlant: (state, action) => {
      const { plantName, plantSpecies, temp, humidity, soilMoist } =
        action.payload;
      state.plantName = plantName;
      state.plantSpecies = plantSpecies;
      state.humidity = humidity;
      state.temp = temp;
      state.soilMoist = soilMoist;
    },
  },
});

export const { setDeviceName, setDeviceId } = deviceSlice.actions;
export const { setPlant } = plantSlice.actions;

const store = configureStore({
  reducer: {
    device: deviceSlice.reducer,
    plant: plantSlice.reducer,
  },
});

export default store;
