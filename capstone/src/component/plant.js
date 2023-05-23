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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedBooths, setCheckedPlant } from '../store/store';

// const PlantBox = styled.div`
//   display: flex;
//   position: relative;
//   width: auto;
//   height: 100;
//   margin: 1rem;
//   flex-shrink: 0;
//   // box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
//   // border: 1px solid #000;
//   // border-radius: 50px;
// `;

const PlantBox = styled.div`
  display: flex;
  position: relative;
  width: 500;
  height: 700px;
  margin: 1rem;
  flex-shrink: 0;
`;
const ContentWrapper = styled.div`
  display: flex;

  align-items: flex-start;
`;
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 700px;
  background: rgb(191, 218, 210);
  border: 1px solid #ccc; /* 테두리 */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3); /* 테두리 그림자 */
  border-radius: 10px; /* 테두리 반경 */
  width: 643px; /* 원하는 너비 값으로 변경하세요 */
  text-align: center;
  align-content: center;
  jusity-content: center;
`;
const CardContent1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  text-align: center;
  align-content: center;
  jusity-content: center;
`;

const Title = styled.h4`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.6;
  color: #00352c;
  padding-top: 5rem;
  padding-left: 3.5rem;

  text-transform: uppercase;
`;
const PlainText = styled.p`
  display: flex;

  font-size: 1.3rem;
  font-family: 'Playfair Display', serif;
  color: #234d44;
  font-weight: 300;
  margin-left: 2rem;
  padding-top: 0.3rem;
`;
const Div1 = styled.div`
  height: 217px;
  width: 373px;
  background: rgb(254, 248, 247);

  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  flex-direction: column;
  margin-left: 4rem;
  border-bottom-right-radius: 10px;
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
    <CardBox>
      <img src={imageUrl} alt="Plant Image" />
      <ContentWrapper onClick={() => handleClick()}>
        <Title>{props.plantInfo.plantName}</Title>
        {/* <Typography variant="body2" color="text.secondary">
            Plant-Serial-Number : {props.plantInfo.plantSerialNumber}
          </Typography> */}
        <Div1>
          <PlainText>Plant Species : {props.plantInfo.plantSpecies}</PlainText>

          <PlainText>Humidity : {props.plantInfo.humidity}</PlainText>

          <PlainText>Temperature : {props.plantInfo.temperature}</PlainText>
          <PlainText>soil-Moisture : {props.plantInfo.soilMoisture}</PlainText>
        </Div1>
      </ContentWrapper>
    </CardBox>
  );
}
