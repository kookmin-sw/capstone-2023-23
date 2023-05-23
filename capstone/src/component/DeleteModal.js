import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

import axios from 'axios';
import { useEffect, useState } from 'react';

//redux
import { deleteBoothReducer, setCheckedBooths } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

const SelectBtn = styled.button`
  display: block;
  text-align: center;
  align-content: center;
  jusity-content: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const DeleteBtn = styled(SelectBtn)`
  border-radius: 0.5rem;
  border: 3px solid rgb(221, 74, 57);
  background: rgb(221, 74, 57);
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // 추가
  justifyContent: 'center', // 추가
};

export default function DeleteModal(props) {
  const { boothList, setBoothList } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const deviceId = useSelector(
    (state) => state.boothCookie.boothCookieSerialNumber
  );

  // const deviceId = useSelector((state) => state.checkedBooth.checkedBooths);
  // console.log('delete', deviceId);

  //Delete 요청 함수

  const deleteBooth = async () => {
    try {
      const url = `http://localhost:8080/device/remove?deviceId=${deviceId}`;
      const response = await axios.get(url);
      // console.log('delete', response);
      handleClose();
      // Delete booth from boothList
      const updatedBoothList = boothList.filter(
        (booth) => booth.deviceId !== deviceId
      );
      setBoothList(updatedBoothList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DeleteBtn onClick={handleOpen}>delete</DeleteBtn>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Delete my Booth
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            booth를 지우시겠습니까?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginTop: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                marginTop: 2,
                marginRight: 15,
                bgcolor: '#7B95B7',
                color: 'white',
                fontSize: 20,
              }}
              onClick={() => {
                deleteBooth();
              }}
            >
              확인
            </Button>
            <Button
              variant="contained"
              size="large"
              color="error"
              sx={{
                marginTop: 2,
                bgcolor: '#ea8f8f',
                color: 'white',
                fontSize: 20,
              }}
              onClick={handleClose}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
