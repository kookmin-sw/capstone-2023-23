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
  border-radius: 0.5rem;
  border: 3px solid rgb(60, 141, 188);
  background: rgb(60, 141, 188);
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
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
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add my plant
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            Plant의 이름과 번호를 정해주세요!
          </Typography>
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
            <TextField
              id="PlantName"
              label="Plant Name"
              variant="outlined"
              sx={{ mt: 3 }}
              value={plantName}
              onChange={(e) => dispatch(setPlantName(e.target.value))}
            />
            <TextField
              id="PlantSpecies"
              label="PlantSpecies"
              variant="outlined"
              sx={{ mt: 3 }}
              value={plantSpecies}
              onChange={(e) => dispatch(setPlantSpecies(e.target.value))}
            />

            {/* data input부분 */}
            <TextField
              id="Humidity"
              label="Humidity"
              variant="outlined"
              sx={{ mt: 3 }}
              value={humidity}
              onChange={(e) => dispatch(setFirstHumidity(e.target.value))}
            />
            <TextField
              id="soilMoisture"
              label="Soil-Moisture"
              variant="outlined"
              sx={{ mt: 3 }}
              value={soilMoisture}
              onChange={(e) => dispatch(setFirstSoilMoisture(e.target.value))}
            />
            <TextField
              id="Temperature"
              label="Temperature"
              variant="outlined"
              sx={{ mt: 3 }}
              value={temperature}
              onChange={(e) => dispatch(setFirstTemperature(e.target.value))}
            />

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
              add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
