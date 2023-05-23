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
  height: 100%;
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgb(230, 231, 234);
`;
const DataContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
  padding: 1rem;
`;
const BoxContainer = styled.div`
  height: 40%;
  padding: 1rem;
`;
const ChartContainer = styled.div`
  height: 60%;
  padding: 1rem;
  background-color: white;
`;
const ImageContainer = styled.div`
  width: 30%;
  height: 100%;
  padding: 1rem;
  background-color: white;
`;
const EnvControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: auto;
  padding: 1rem;
  height: 40%;
`;
const Btn = styled.button`
  width: fit-content;
  block-size: fit-content;
`;
const Cstm = styled.div`
  m:10,
  padding:10,
  width: 10px;
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
    <BasicLayout>
      <DataContainer>
        <ChartContainer>
          <DataChart />
        </ChartContainer>
        <BoxContainer>
          <DataBox />
        </BoxContainer>
      </DataContainer>
      <Box>
        <divCstm>
          <img src={imageUrl} alt="Plant Image" />
        </divCstm>

        {/* <ImageContainer>
        <div style={{ width: '100%', height: '100%' }}></div>
        <Btn onClick={() => navigate(`/`)}>Home 가기</Btn>
      </ImageContainer> */}
        <EnvControlContainer>
          <EnvControl></EnvControl>
        </EnvControlContainer>
      </Box>
    </BasicLayout>
  );
}
export default MainContent;
