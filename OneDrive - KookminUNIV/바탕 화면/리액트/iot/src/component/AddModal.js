import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

//axios
import axios from 'axios';

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
};

export default function AddModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [boothName, setBoothName] = React.useState('');
  const [boothSerialNum, setBoothSerialNum] = React.useState('');

  // 부스 이름과 시리얼 번호 가져오기
  const saveBoothName = (event) => {
    setBoothName(event.target.value);
    console.log(event.target.value);
  };

  const saveBoothSerialNum = (event) => {
    setBoothSerialNum(event.target.value);
    console.log(event.target.value);
  };

  // const Handler_function = () => {
  //   const [form, setForm] = React.useState({
  //     boothName: '',
  //     boothSerialNum: '',
  //   });

  //   const { boothName, boothSerialNum } = form;

  //   const onChange = (e) => {
  //     const nextForm = {
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     };
  //     console.log(nextForm);
  //     setForm(nextForm);
  //   };

  //   const handleClick = () => {
  //     setForm({ boothName: '', boothSerialNum: '' });
  //   };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        sx={{
          m: 5,
          lp: 2,
          rp: 2,
          bgcolor: '#7B95B7',
          color: 'white',
          fontSize: 20,
          align: 'center',
          minWidth: 100,
        }}
        onClick={handleOpen}
      >
        add
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add my booth
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            Booth의 이름과 번호를 정해주세요!
          </Typography>
          <TextField
            id="BoothName"
            label="Booth Name"
            variant="outlined"
            sx={{ mt: 3 }}
            value={boothName}
            onChange={saveBoothName}
          />
          <TextField
            id="BoothSerialNumber"
            label="Booth Serial Number"
            variant="outlined"
            sx={{ mt: 3 }}
            value={boothSerialNum}
            onChange={saveBoothSerialNum}
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              bgcolor: '#7B95B7',
              color: 'white',
              fontSize: 20,
            }}
            // onClick={handleClick}
          >
            add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
