import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import DataChart from '../component/DataChart';
import DataList from '../component/DataList';
import EmptyPage from '../component/EmptyPage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

import { useEffect, useState } from 'react';

import DataBox from '../component/DataBox';
import styled from 'styled-components';
// //Farm/booth/plant1
//axios
import axios from 'axios';
import { useSelector } from 'react-redux';
import EnvControl from './EnvControl';

import { useDispatch } from 'react-redux';

const BasicLayout = styled.div`
  width: 100wv;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // background-color: rgb(129, 184, 168, 0.3);
`;

const DataContainer = styled.div`
  max-height: 600px;
  justify-content: center;
  width: 1000px;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 1032px;
  height: 290px;
`;

const Box1 = styled.div`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  display: flex;
  justify-content: center;
  height: 150px;
  padding: 1rem;
  width: 400px;
`;

const ChartContainer = styled.div`
  transform: translateY(15%);
  border: 15px solid white;
  border-radius: 10px;

  display: flex;
  height: 550px;

  background-color: white;
  width: 1000px;
  margin-bottom: 6rem;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 100%;
  padding: 1rem;
  background-color: white;
`;

const EnvControlContainer = styled.div`
  // left: 70%;
  // transform: translateY(-45%);
  // right: 1%;
  // display: flex;
  // height: 820px;
  // width: 550px;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // background-color: white;
  // border: 10px solid rgb(50,110,98,0.4);
  // border-radius:10px;
  padding-top: 4rem;

  // boxShadow: 24,
  // flex: 1;
`;

const Btn = styled.button`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  width: fit-content;
  block-size: fit-content;
`;

const Cstm = styled.div`
  m: 10;
  padding: 10;
  width: 10px;
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

const div1 = styled.div`
  padding: 10;
`;
const Box0 = styled.div`
  height: 100vh;
  // height: 1000px;
  padding-bottom: 5rem;
  background-color: rgb(129, 184, 168, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
function MainContent() {
  const [imageUrl, setImageUrl] = useState('');

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

  const navigate = useNavigate();
  return (
    <Box0>
      <BasicLayout>
        <ChartContainer>
          <DataChart />
        </ChartContainer>

        <BoxContainer>
          <DataBox />
        </BoxContainer>
      </BasicLayout>

      <EnvControlContainer>
        <EnvControl></EnvControl>
      </EnvControlContainer>
    </Box0>
  );
}
export default MainContent;
