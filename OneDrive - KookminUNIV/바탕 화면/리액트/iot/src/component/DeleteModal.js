import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

export default function DeleteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="error"
        sx={{
          m: 5,
          lp: 2,
          rp: 2,
          bgcolor: '#ea8f8f',
          color: 'white',
          fontSize: 20,
          align: 'center',
          minWidth: 100,
        }}
        onClick={handleOpen}
      >
        delete
      </Button>

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
