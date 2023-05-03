import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

//axios
import axios from 'axios';

import Booth2 from '../component/Booth2';
import { Container, Button } from '@mui/material';

import AddModal from '../component/AddModal';
import DeleteModal from '../component/DeleteModal';

function BoothSelection() {
  const scrollbarHeight =
    window.innerWidth - document.documentElement.clientWidth;
  return (
    <>
      {/* 이곳에 프로필 요소 하나 들어가나? */}
      <Box
        sx={{
          mt: 5,
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          overflow: 'auto',
          pt: scrollbarHeight,
          flexDirection: 'column',
        }}
      >
        {/* booth map 함수 사용해서 구현해야 할 부분 */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Booth2
              key={index}
              sx={{
                flex: '0 0 calc(33.33% - 16px)',
                mx: 2,
                my: 4,
                maxWidth: 'calc(33.33% - 16px)',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* add버튼과 delete버튼 , 수평으로 배치되도록*/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          my: 4,
        }}
      >
        <AddModal />
        <DeleteModal />
      </Box>
    </>
  );
}
export default BoothSelection;
