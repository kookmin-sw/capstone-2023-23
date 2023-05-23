// farm 화면에 들어간 booth들

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setBoothCookieSerialNumber, setCheckedBooths } from '../store/store';

const BoothBox = styled.div`
  display: flex;
  position: relative;
  width: 350px;
  height: 300px;
  margin: 1rem;
  flex-shrink: 0;
  //
`;
const CardContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0;
`;
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 320px;
  background: rgb(254, 242, 240, 0.6);
  border: 1px solid #ccc; /* 테두리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 테두리 그림자 */
  border-radius: 4px; /* 테두리 반경 */
  width: 350px; /* 원하는 너비 값으로 변경하세요 */
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

  margin: 1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;

  padding-bottom: 1rem;
`;

const Title = styled.h4`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.6;
  // color: rgba(0, 0, 0, 0.87);
  color: #00352c;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  margin-left: 2rem;

  text-transform: uppercase;
`;
const PlainText = styled.p`
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  color: #234d44;
  font-weight: 300;
  justify-content: center;
  align-items: center;
`;
export default function Booth2(props) {
  const navigate = useNavigate();

  //checkBox  상태 관리
  const [isChecked, setIsChecked] = useState(false);

  //delete event 관리
  const dispatch = useDispatch();
  const boothCookie = useSelector(
    (state) => state.boothCookie.setBoothCookieSerialNumber
  );
  const checkedBooths = useSelector(
    (state) => state.checkedBooth.checkedBooths
  );

  //checkBox로 선택된 deviceId가져옴
  function handleCheckBoxChange(event) {
    event.stopPropagation();
    const checkedId = event.target.value;

    if (event.target.checked) {
      dispatch(setCheckedBooths(checkedId));

      // //deletModal에 deviceId 전달하려고 일단 deviceId 담아둠
      // dispatch(setBoothCookieSerialNumber(event.target.value));

      setIsChecked(event.target.checked);
    } else {
      dispatch(
        setCheckedBooths(checkedBooths.filter((id) => id !== checkedId))
      );
    }
  }

  //boothCookie에 props.boothInfo.deviceId값을 저장
  function handleClick(event) {
    const deviceId = props.boothInfo.deviceId;

    dispatch(setBoothCookieSerialNumber(deviceId));
    console.log('booth2', deviceId);

    //변경한
    navigate('/Farm/booth/plantIntro/');
  }
  return (
    <BoothBox>
      <CardBox>
        <Checkbox
          checked={isChecked} //checkBox 상태 설정
          onChange={handleCheckBoxChange} //checkBox 상태 변경 핸들러
          inputProps={{ 'aria-label': 'controlled' }}
          value={props.boothInfo.deviceId} //check된 booth의 id 가져옴(서버 요청 후 DB에서 받은)
        />
        <Title>{props.boothInfo.deviceName}</Title>
        <CardContent1 onClick={() => handleClick()}>
          <PlainText variant="body2" color="text.secondary">
            device ID : {props.boothInfo.deviceId}
          </PlainText>
          <PlainText variant="body2" color="text.secondary">
            Plant Species : {props.boothInfo.plantSpecies}
          </PlainText>
          <PlainText variant="body2" color="text.secondary">
            Plant Name : {props.boothInfo.plantName}
          </PlainText>
        </CardContent1>
      </CardBox>
    </BoothBox>
  );
}
