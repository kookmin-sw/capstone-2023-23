import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import backgroundImg from '../img/hero_background.jpg';

//axios
import axios from 'axios';

import Plant from './plant';

//redux

import AddModalPlant from './AddModalPlant';
import DeleteModalPlant from './DeleteModalPlant';
import { setPlantName, setPlantSpecies } from '../store/store';

const BasicLayout = styled.div`
  height: 92vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  align-item: center;
  justify-content: center;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const BoothRoot = styled.div`
  display: flex;
  margin: 0 auto;
  padding 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 6s0%;
`;
const BoothContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 50%;
  grid-auto-flow: dense;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: auto;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;
const PlainText = styled.p`
  margin: 0 auto;
  padding: 0rem 1rem;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(80, 112, 61);
  width: fit-content;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 0.3rem;
`;
const Underline = styled.div`
  width: 80px;
  height: 0.4rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  color: #48742c;
  background: #48742c;
  display: flex;
  position: relative;
  align-item: center;
  justify-content: center;
`;
const BtnContainer = styled.div`
  display: flex;
  float: right;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: right;
  align-content: right;
  width: 95%;
`;
const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

function PlantIntro(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 식물 등록 여부를 묻는 컨테이너
  const [showAddContainer, setShowAddContainer] = useState(false);

  //API
  const [user, setUser] = useState([]);

  //추가 or 삭제된 plant 목록 관리
  const [plantList, setPlantList] = useState([]);

  //식물 등록되지 않았을 때 판별
  const [plant, setPlant] = useState('');

  const addPlant = (plant) => {
    setPlantList(plant);
  };
  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  //현재 코드
  useEffect(() => {
    if (deviceId) {
      async function fetchData() {
        try {
          const url = `http://localhost:8080/device/load/one?deviceId=${deviceId}`;
          const response = await axios.get(url);
          setPlantList(response.data);

          //EnvControl 오류1 해결: 처음 plantIntro 조회 시 plantName, plantSpecies 저장
          dispatch(setPlantName(response.data.plantName));
          dispatch(setPlantSpecies(response.data.plantSpecies));

          setPlant(response.data.plantName);

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [setPlant]);

  //식물을 등록하지 않은 경우
  useEffect(() => {
    if (plant === null) {
      setShowAddContainer(true); // plant가 null이면 추가 컨테이너 표시
    }
  }, [plant]);

  return (
    <div>
      <BasicLayout>
        <HeadContainer>
          <PlainText>Hello! {user[1] + ' ' + user[2]}</PlainText>
          <Underline></Underline>
        </HeadContainer>
        <BoothRoot>
          <Plant plantInfo={plantList} />

          <BtnContainer>
            <AddModalPlant addPlant={addPlant} />
            <DeleteModalPlant plant={plant} setPlant={setPlant} />
          </BtnContainer>
        </BoothRoot>
      </BasicLayout>
    </div>
  );
}
export default PlantIntro;

//등록된 식물이 없는 경우 즉, plantName이 null인 경우에는 추가하시겠습니까 컨테이너 띄어주기
//그게 아니라면 그냥 plant 컴포넌트띄어주기
// {showAddContainer ? (
//   <Box>
//     <PlainText>Plant를 추가하시겠습니까?</PlainText>
//     {/* AddModalPlant.js에 addPlant 함수 호출할 수 있도록 props 사용 */}
//     <AddModalPlant addPlant={addPlant} />
//   </Box>
// ) : (
//   <BoothContainer>
//     <Plant plantInfo={plantList} />
//   </BoothContainer>
// )}
