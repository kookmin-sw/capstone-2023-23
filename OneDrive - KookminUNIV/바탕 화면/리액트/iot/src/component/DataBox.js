import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Box, Typography, Button, Grid } from '@material-ui/core';

//axios
import axios from 'axios';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateHumidity, updateSoil, updateTemp } from '../store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DataBox() {
  //redux
  const dispatch = useDispatch();
  let soilMoisture = useSelector((state) => state.soilMoisture);
  let temp = useSelector((state) => state.temp);
  let humidity = useSelector((state) => state.humidity);

  //dispatch가 실행 때마다 data 업데이트 해서 보여주는 코드
  //useEffect의 의존성 배열(두번째 매개변수)에 dispatch
  React.useEffect(() => {
    axios.get('http://localhost:3001/dummy').then((result) => {
      //일단 0시의 temp와 humidity
      let moistValue = result.data[1].data[0].y;
      let tempValue = result.data[0].data[0].y;
      let humidityValue = result.data[1].data[0].y;

      //Dispatch
      dispatch(updateSoil(moistValue));
      dispatch(updateTemp(tempValue));
      dispatch(updateHumidity(humidityValue));
    });
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 1, sm: 4, md: 12 }}
        justifyContent="center"
      >
        <Grid>
          <Item
            sx={{
              m: 5,
              width: 300,
              height: 180,
              border: '2px solid #E1E2E3 ',
            }}
          >
            <h1>Humidity</h1>
            <Typography variant="h5" component="div">
              {humidity}
            </Typography>
          </Item>
        </Grid>
        <Grid>
          <Item
            sx={{
              m: 5,
              width: 300,
              height: 180,
              border: '2px solid #E1E2E3 ',
            }}
          >
            <h1>Temperature</h1>
            <Typography variant="h5" component="div">
              {temp}
            </Typography>
          </Item>
        </Grid>

        <Grid>
          <Item
            sx={{
              m: 5,
              width: 300,
              height: 180,
              border: '2px solid #E1E2E3 ',
            }}
          >
            <h1>Soil-Moisture</h1>
            <Typography variant="h5" component="div">
              {soilMoisture}
            </Typography>
          </Item>
        </Grid>
        <Grid>
          <Item
            sx={{
              m: 5,
              width: 300,
              height: 180,
              border: '2px solid #E1E2E3 ',
            }}
          >
            <h1>Amount of sunshine</h1>
            <Typography variant="h5" component="div"></Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
