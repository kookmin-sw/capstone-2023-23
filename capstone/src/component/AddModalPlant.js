import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import styled from 'styled-components';
//axios
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//redux
import {
  setPlantName,
  setPlantSerialNumber,
  setPlantSpecies,
  setFirstHumidity,
  setFirstSoilMoisture,
  setFirstTemperature,
  setBoothSerialNumber,
} from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

const Title = styled.h4`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;
const CustomInput = styled.input`
  letter-spacing: 0.3rem;
  font-size: 1.5rem;
  background-color: #fef2f0;
  box-sizing: content-box;
  height: 3.5rem;
  width: 100%;
  padding: 0;

  border: 0;
  &:focus {
    outline: 2px solid rgba(72, 116, 44, 0.5);
  }
  margin-bottom: 2rem;
`;
const CustomLabel = styled.label`
  // color: rgba(0, 0, 0, 0.6);
  color: #00352c;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
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
const AddBtn = styled(SelectBtn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  border-radius: 0.5rem;
  border: 3px solid #5b8b81;
  background: #5b8b81;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  padding-left: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  display: flex;
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
  margin-bottom: 4rem;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.87);
  padding: 2rem;
`;
const PlainText = styled.p`
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.1rem;
  color: #326e62;
  font-weight: 400;
`;

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  width: '450px',
  height: '800px',
  bgcolor: 'background.paper',
  border: '10px solid rgb(50,110,98,0.5)',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1rem',
};

export default function AddModalPlant(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  //DB에 부스 이름과 번호를 등록
  const handleSubmit3 = async (
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
      console.log('addPlant', response);
      dispatch(setBoothSerialNumber(response.data.deviceId));
      dispatch(setPlantName(response.data.plantName));

      dispatch(setPlantSpecies(response.data.plantSpecies));
      dispatch(setFirstHumidity(response.data.firstHumidity));
      dispatch(setFirstSoilMoisture(response.data.firstSoilMoisture));
      dispatch(setFirstTemperature(response.data.firstTemperature));

      //add버튼 누를시 rerendering 되도록하기 위한
      const newPlant = {
        id: deviceId,
        humidity,
        soilMoisture,
        temperature,
        plantName,
        plantSpecies,
      };
      props.addPlant(newPlant);
      navigate('/Farm/Booth/plantIntro');
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  //상태값 초기화를 위한 코드
  React.useEffect(() => {
    return () => {
      setPlantName('');
      setPlantSerialNumber('');
      setPlantSpecies('');
      setFirstHumidity('');
      setFirstSoilMoisture('');
      setFirstTemperature('');
    };
  }, []);

  return (
    <div>
      <AddBtn onClick={handleOpen}>add</AddBtn>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title id="modal-modal-title">Add my plant</Title>

          <Box
            component="form"
            onSubmit={(event) =>
              handleSubmit3(
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
            <div>
              <CustomLabel>Booth Name</CustomLabel>
              <CustomInput
                id="PlantName"
                label="Plant Name"
                value={plantName}
                onChange={(e) => dispatch(setPlantName(e.target.value))}
              />
            </div>
            {/* <TextField
              id="PlantName"
              label="Plant Name"
              variant="outlined"
              sx={{ mt: 3 }}
              value={plantName}
              onChange={(e) => dispatch(setPlantName(e.target.value))}
            /> */}
            <div>
              <CustomLabel>Booth Species</CustomLabel>
              <CustomInput
                id="PlantSpecies"
                label="PlantSpecies"
                value={plantSpecies}
                onChange={(e) => dispatch(setPlantSpecies(e.target.value))}
              />
            </div>

            {/* <TextField
              id="PlantSpecies"
              label="PlantSpecies"
              variant="outlined"
              sx={{ mt: 3 }}
              value={plantSpecies}
              onChange={(e) => dispatch(setPlantSpecies(e.target.value))}
            /> */}

            {/* data input부분 */}
            <div>
              <CustomLabel>Humidity</CustomLabel>
              <CustomInput
                id="Humidity"
                label="Humidity"
                variant="outlined"
                value={humidity}
                onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
              />
            </div>
            {/* <TextField
              id="Humidity"
              label="Humidity"
              variant="outlined"
              sx={{ mt: 3 }}
              value={humidity}
              onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
            /> */}
            <div>
              <CustomLabel>Soil Moisture</CustomLabel>
              <CustomInput
                id="soilMoisture"
                label="Soil-Moisture"
                variant="outlined"
                sx={{ mt: 3 }}
                value={soilMoisture}
                onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
              />
            </div>
            {/* <TextField
              id="soilMoisture"
              label="Soil-Moisture"
              variant="outlined"
              sx={{ mt: 3 }}
              value={soilMoisture}
              onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
            /> */}
            <div>
              <CustomLabel>Temperature</CustomLabel>
              <CustomInput
                id="Temperature"
                label="Temperature"
                variant="outlined"
                sx={{ mt: 3 }}
                value={temperature}
                onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
              />
            </div>
            {/* <TextField
              id="Temperature"
              label="Temperature"
              variant="outlined"
              sx={{ mt: 3 }}
              value={temperature}
              onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
            /> */}

            <CustomBtn type="submit" size="large">
              add
            </CustomBtn>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
