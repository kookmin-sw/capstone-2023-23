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
  width: auto;
  height: 90%;
  margin: 1rem;
  flex-shrink: 0;
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
      <Card>
        <Checkbox
          checked={isChecked} //checkBox 상태 설정
          onChange={handleCheckBoxChange} //checkBox 상태 변경 핸들러
          inputProps={{ 'aria-label': 'controlled' }}
          value={props.boothInfo.deviceId} //check된 booth의 id 가져옴(서버 요청 후 DB에서 받은)
        />
        <CardContent onClick={() => handleClick()}>
          <Typography gutterBottom variant="h5" component="div">
            {props.boothInfo.deviceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            device ID : {props.boothInfo.deviceId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Plant Species : {props.boothInfo.plantSpecies}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Plant Name : {props.boothInfo.plantName}
          </Typography>
        </CardContent>
      </Card>
    </BoothBox>
  );
}
