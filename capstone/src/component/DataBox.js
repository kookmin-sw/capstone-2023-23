// maincontent의 dataBox
import * as React from 'react';
//axios
import axios from 'axios';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateHumidity, updateSoil, updateTemp } from '../store/store';
import styled from 'styled-components';

const BoxContainer = styled.div`
  background-color: rgb(50, 110, 98, 0.4);

  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  justify-content: center;
  margin: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;
const Box = styled.div`
  width: 45%;
  height: 90px;
  border-radius: 10px;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  background-color: white;
  padding-left: 1rem;
`;

const DataID = styled.h2`
  margin: 1rem;
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  line-height: 1.167;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 4px solid rgb(50, 110, 98);

  min-width: 270px;
`;

const SmallText = styled.p`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 1.5;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto 2rem;
  padding-right: 2rem;
`;
const PlainText = styled.p`
  margin: 0 auto;
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.2rem;
  color: #00352c;
  width: fit-content;
  font-weight: 700;
  text-transform: uppercase;
`;

export default function DataBox() {
  //redux
  const dispatch = useDispatch();
  let soilMoisture = useSelector((state) => state.soilMoisture);
  let temp = useSelector((state) => state.temp);
  let humidity = useSelector((state) => state.humidity);
  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  //dispatch가 실행 때마다 data 업데이트 해서 보여주는 코드
  //오류 났었던 이유-server.js에 api 경로 설정 안해줘서
  React.useEffect(() => {
    if (deviceId) {
      async function fetchData() {
        try {
          // const url2 = `http://localhost:8080/dataout/total?deviceId=${1234}`;
          const url2 = `http://localhost:8080/dataout/recent?deviceId=${1234}`;
          const response2 = await axios.get(url2);
          console.log('dataBox', response2);

          //가장 최신 값으로 update
          // const maxIndex = response2.data.length - 1;
          const updateData = response2.data;

          let moistValue = updateData.soilMoisture;
          let tempValue = updateData.temperature;
          let humidityValue = updateData.humidity;

          //Dispatch
          dispatch(updateSoil(moistValue));
          dispatch(updateTemp(tempValue));
          dispatch(updateHumidity(humidityValue));

          console.log(response2);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [deviceId]);

  return (
    <BoxContainer>
      <Box>
        <DataID>Temp</DataID>
        <SmallText>{temp}</SmallText>
      </Box>
      <Box>
        <DataID>Humidity</DataID>
        <SmallText>{humidity}</SmallText>
      </Box>
      <Box>
        <DataID>Soil-Moisture</DataID>
        <SmallText>{soilMoisture}</SmallText>
      </Box>
      <Box>
        <DataID>Else</DataID>
        <SmallText>else</SmallText>
      </Box>
    </BoxContainer>
  );
}
