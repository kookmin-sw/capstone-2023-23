import * as React from 'react';
import axios from 'axios';

//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

//redux
import { useSelector, useDispatch } from 'react-redux';
//현재 적정 환경정보
import { updateHumidity, updateSoil, updateTemp } from '../store/store';

//patch한 정보를 dispatch 하기 위한
import {
  setPlantName,
  setPlantSpecies,
  setFirstHumidity,
  setFirstSoilMoisture,
  setFirstTemperature,
  setBoothSerialNumber,
} from '../store/store';

const Box1 = styled.div`
  border: 10px solid white;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 500px;
  height: 835px;
  margin-left: 2rem;
  margin-right: 2rem;

  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;
const Title = styled.h2`
  font-size: 3rem;

  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  color: #00352c;

  font-weight: 600;
  padding-bottom: 1.5rem;
  padding-top: 0.5rem;
`;
const CustomInput = styled.input`
  font: inherit;
  letter-spacing: inherit;
  background-color: #fef2f0;
  box-sizing: content-box;
  height: 3.5rem;
  font-size: 2rem;
  width: 100%;

  border: 0;
  &:focus {
    outline: 2px solid rgba(72, 116, 44, 0.5);
  }
  margin-bottom: 2.4rem;
`;
const CustomLabel = styled.label`
  // color: rgba(0, 0, 0, 0.6);
  color: #00352c;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0;
  text-align: left;
`;
const SelectBtn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;

const Btn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const CustomBtn = styled(Btn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  color: rgb(50, 110, 98);
  width: 100%;
  height: 3.5rem;
  border-radius: 5px;
  border: none;

  background: rgb(50, 110, 98, 0.5);
  color: white;
  font-weight: 700;

  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
`;
const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0.5rem;
`;
const PlainText = styled.p`
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.1rem;
  color: #326e62;
  font-weight: 400;
`;

export default function EnvControl() {
  //확인 버튼 눌렀을 시 알림창 설정
  const [showNotification, setShowNotification] = React.useState(false);

  //redux
  const dispatch = useDispatch();
  const plantName = useSelector((state) => state.plant.plantName);
  const plantSpecies = useSelector((state) => state.plant.plantSpecies);
  const humidity = useSelector((state) => state.plant.firstHumidity);
  const soilMoisture = useSelector((state) => state.plant.firstSoilMoisture);
  const temperature = useSelector((state) => state.plant.firstTemperature);
  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  const handleSubmit1 = async (
    event,
    deviceId,
    humidity,
    soilMoisture,
    temperature,
    plantName,
    PlantSpecies
  ) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8080/device/register/plant?deviceId=${deviceId}`;
      const response = await axios.patch(url, {
        deviceId: deviceId,
        humidity: humidity,
        soilMoisture: soilMoisture,
        temperature: temperature,
        plantName: plantName,
        plantSpecies: plantSpecies,
      });
      console.log('EnvControl', response);

      dispatch(setBoothSerialNumber(response.data.deviceId));
      dispatch(setPlantName(response.data.plantName));
      dispatch(setPlantSpecies(response.data.plantSpecies));

      //text field 초기화
      dispatch(setFirstHumidity(''));
      dispatch(setFirstSoilMoisture(''));
      dispatch(setFirstTemperature(''));

      setShowNotification(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box1>
      <Title>Change environment information</Title>
      <Box
        component="form"
        onSubmit={(event) =>
          handleSubmit1(
            event,
            deviceId,
            humidity,
            soilMoisture,
            temperature,
            plantName,
            plantSpecies
          )
        }
      >
        <Div1>
          <CustomLabel>Humidity</CustomLabel>
          <CustomInput
            id="Humidity"
            label="Humidity"
            variant="outlined"
            value={humidity}
            onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
          />
        </Div1>
        {/* <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
          Humidity
        </Typography>
        <TextField
          id="Humidity"
          label="Humidity"
          variant="outlined"
          value={humidity}
          sx={{ m: 1 }}
          onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
        /> */}

        <Div1>
          <CustomLabel>Soil Moisture</CustomLabel>
          <CustomInput
            id="soilMoisture"
            label="Soil-Moisture"
            variant="outlined"
            sx={{ mt: 3 }}
            value={soilMoisture}
            onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
          />
        </Div1>
        {/* <Typography variant="h6" fontWeight="bold" mb={1}>
          Soil-Moisture
        </Typography>
        <TextField
          id="soilMoisture"
          label="Soil-Moisture"
          variant="outlined"
          value={soilMoisture}
          sx={{ m: 1 }}
          onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
        /> */}

        <Div1>
          <CustomLabel>Temperature</CustomLabel>
          <CustomInput
            id="Temperature"
            label="Temperature"
            variant="outlined"
            sx={{ mt: 3 }}
            value={temperature}
            onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
          />
        </Div1>
        {/* <Typography variant="h6" fontWeight="bold" mb={1}>
          Temperature
        </Typography>
        <TextField
          id="Temperature"
          label="Temperature"
          variant="outlined"
          value={temperature}
          sx={{ m: 1 }}
          onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
        /> */}
        <CustomBtn type="submit">Confirm</CustomBtn>
      </Box>

      {showNotification && (
        <Alert
          sx={{ mt: 3 }}
          variant="outlined"
          severity="success"
          onClose={() => setShowNotification(false)}
        >
          It's changed!
        </Alert>
      )}
    </Box1>
  );
}
