import * as React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Booth2() {
  return (
    <Box
      sx={{
        m: 5,

        width: 350,
        Height: 250,
      }}
    >
      <Card
        sx={{ p: 3, height: 250, Width: 350, border: '2px solid #E1E2E3 ' }}
      >
        <CardMedia
          sx={{ height: 150 }}
          // 서버에서 해당 부스 이미지를 가져오면 좋을까?
          image="https://pin.it/4qtCOeQ"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Booth Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            explanation of my booth
          </Typography>
        </CardContent>

        {/* 아래 버튼은 plant 화면으로 넘어가는 버튼 */}
        {/* <CardActions>
          <Button size="small">show plant</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}
