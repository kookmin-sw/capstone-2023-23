// farm 화면에 들어간 booth들

import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedBooths, setCheckedPlant } from '../store/store';

const PlantBox = styled.div`
  display: flex;
  position: relative;
  width: auto;
  height: 100;
  margin: 1rem;
  flex-shrink: 0;
`;

export default function Plant(props) {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');

  //   //checkBox  상태 관리
  const [isChecked, setIsChecked] = useState(false);

  //   //delete event 관리
  const dispatch = useDispatch();
  const checkedPlant = useSelector((state) => state.checkedPlant.checkedPlant);

  function handleCheckBoxChange(event) {
    event.stopPropagation();
    const checkedId = event.target.value;

    if (event.target.checked) {
      dispatch(setCheckedPlant(checkedId));
      setIsChecked(event.target.checked);
      console.log('plant', event.target.value);
    } else {
      dispatch(setCheckedPlant(checkedPlant.filter((id) => id !== checkedId)));
    }
  }
  useEffect(() => {
    fetchImage(); // 이미지 URL 가져오는 함수 호출
  }, []);

  async function fetchImage() {
    try {
      const response = await axios.get('http://localhost:8080/dataout/image', {
        params: {
          deviceId: 1234,
        },
        responseType: 'blob', // 이미지 데이터를 blob 형식으로 받기 위해 responseType을 설정
      });
      const imageUrl = URL.createObjectURL(response.data); // Blob 데이터를 URL로 변환
      setImageUrl(imageUrl); // 이미지 URL 변수에 할당
      console.log(response);
    } catch (error) {
      console.error('이미지 가져오기 실패:', error);
    }
  }

  //click 시 main content로 넘어가도록
  function handleClick(event) {
    navigate('/Farm/booth/plant1/');
  }
  return (
    <PlantBox>
      <Card>
        <CardContent onClick={() => handleClick()}>
          <img src={imageUrl} alt="Plant Image" />

          <Typography gutterBottom variant="h5" component="div">
            {props.plantInfo.plantName}
          </Typography>

          {/* <Typography variant="body2" color="text.secondary">
            Plant-Serial-Number : {props.plantInfo.plantSerialNumber}
          </Typography> */}

          <Typography variant="body2" color="text.secondary">
            PlantSpecies : {props.plantInfo.plantSpecies}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Humidity : {props.plantInfo.humidity}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Temperature : {props.plantInfo.temperature}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            soilMoisture : {props.plantInfo.soilMoisture}
          </Typography>
        </CardContent>
      </Card>
    </PlantBox>
  );
}
