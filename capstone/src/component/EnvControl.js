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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        적정 환경 제어하기
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
            Humidity
          </Typography>
          <TextField
            id="Humidity"
            label="Humidity"
            variant="outlined"
            value={humidity}
            sx={{ m: 1 }}
            onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Soil-Moisture
          </Typography>
          <TextField
            id="soilMoisture"
            label="Soil-Moisture"
            variant="outlined"
            value={soilMoisture}
            sx={{ m: 1 }}
            onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Temperature
          </Typography>
          <TextField
            id="Temperature"
            label="Temperature"
            variant="outlined"
            value={temperature}
            sx={{ m: 1 }}
            onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            bgcolor: '#7B95B7',
            color: 'white',
            fontSize: 20,
          }}
        >
          확인
        </Button>
        {showNotification && (
          <Alert
            sx={{ mt: 3 }}
            variant="outlined"
            severity="info"
            onClose={() => setShowNotification(false)}
          >
            변경 되었습니다!
          </Alert>
        )}
      </Box>
    </Box>
  );
}
