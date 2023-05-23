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
import { setBoothName, setBoothSerialNumber } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
//rendering
import Booth2 from './Booth2';

const Title = styled.h4`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 3rem;
`;
const CustomInput = styled.input`
  letter-spacing: 0.5rem;
  font-size: 1.5rem;

  background-color: #fef2f0;
  box-sizing: content-box;
  height: 3.5rem;

  width: 100%;

  border: 0;
  &:focus {
    outline: 2px solid rgba(72, 116, 44, 0.5);
  }
  margin-bottom: 2rem;
`;
const CustomLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 0;
  text-align: left;
`;
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
  border: 3px solid #5b8b81;
  background: #5b8b81;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  padding-left: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  display: flex;
`;

const Btn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const CustomBtn = styled(Btn)`
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;
  color: rgb(50, 110, 98);
  width: 100%;
  height: 3.5rem;
  border-radius: 5px;
  border: none;

  background: rgb(50, 110, 98, 0.5);
  color: white;
  font-weight: 700;

  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.87);
  padding: 2rem;
`;
const PlainText = styled.p`
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.1rem;
  color: #326e62;
  font-weight: 400;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  width: 400,
  bgcolor: 'background.paper',
  border: '10px solid rgb(50,110,98,0.5)',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function AddModal(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //redux
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user[0]);

  const deviceName = useSelector((state) => state.booth.boothName);

  const deviceId = useSelector((state) => state.booth.boothSerialNumber);

  //DB에 userId와 deviceId 등록
  const handleSubmit1 = async (event, userId, deviceId, deviceName) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/device/register/newdevice',
        {
          userId: userId,
          deviceId: deviceId,
          deviceName: deviceName,
        }
      );

      // dispatch(setBoothName(''));

      dispatch(setBoothSerialNumber(response.data.deviceId));
      dispatch(setBoothName(response.data.deviceName));
      console.log('addModal', deviceId);

      //add버튼 누를시 rerendering 되도록하기 위한
      const newBooth = { id: deviceId, deviceName };

      props.addBooth(newBooth);
      navigate('/Farm');
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  //상태값 초기화를 위한 코드
  React.useEffect(() => {
    return () => {
      setBoothName('');
      setBoothSerialNumber('');
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
          <Title>Add my booth</Title>
          {/* <plainText id="modal-modal-description" sx={{ mt: 3 }}>
            Booth의 이름과 번호를 정해주세요!
          </plainText> */}

          <Box
            component="form"
            onSubmit={(event) =>
              handleSubmit1(event, userId, deviceId, deviceName)
            }
          >
            {/* <TextField
              id="BoothName"
              label="Booth Name"
              variant="outlined"
              sx={{ mt: 3 }}
              value={deviceName}
              onChange={(e) => dispatch(setBoothName(e.target.value))}
            /> */}
            <inputDiv>
              <CustomLabel>Booth Name</CustomLabel>
              <CustomInput
                id="BoothName"
                type="deviceName"
                value={deviceName}
                onChange={(e) => dispatch(setBoothName(e.target.value))}
              />
            </inputDiv>
            <inputDiv>
              <CustomLabel>Booth ID</CustomLabel>
              <CustomInput
                id="BoothSerialNumber"
                type="BoothSerialNumber"
                value={deviceId}
                onChange={(e) => dispatch(setBoothSerialNumber(e.target.value))}
              />
            </inputDiv>

            {/* <TextField
              id="BoothSerialNumber"
              label="Booth Serial Number"
              variant="outlined"
              sx={{ mt: 3 }}
              value={deviceId}
              onChange={(e) => dispatch(setBoothSerialNumber(e.target.value))}
            /> */}

            <CustomBtn type="submit">add</CustomBtn>

            {/* <Button
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
            </Button> */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
