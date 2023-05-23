import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@material-ui/core';

//icon
import HomeIcon from '@mui/icons-material/Home';
import YardIcon from '@mui/icons-material/Yard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//router
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const PlainText = styled.p`
  margin: 0 auto;
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.2rem;
  color: #00352c;
  width: fit-content;
  font-weight: 500;
  text-transform: uppercase;
`;
const Title = styled.h2`
  font-size: 2rem;

  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5rem;

  color: #00352c;

  font-weight: 600;
  padding: 1rem;
`;
const Div1 = styled.div`
  background-color: #fef2f0;
  border-radius: 0.5rem;
  border: 3px solid #fef2f0;
  text-align: center;
  padding: 1rem;
`;
export default function NestedList(props) {
  const test = useSelector((state) => state.user);
  let navigate = useNavigate();

  return (
    <List
      sx={{
        padding: 3,
        width: 300,
        height: '100vh',
        maxWidth: 360,
        bgcolor: 'rgb(129, 184, 168, 0.3)',
      }}
      component="nav"
      subheader={
        <Div1>
          <Title>Hello! {test[2] + ' ' + test[3]}</Title>
        </Div1>
      }
    >
      <Divider />
      <ListItemButton
        onClick={() => {
          navigate('/');
        }}
        sx={{ paddingTop: 1 }}
      >
        <ListItemIcon>
          <HomeIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Home"
          primaryTypographyProps={{
            m: 1,
            pl: 3,
            fontSize: '25px',
            fontWeight: '900',
            fontFamily: 'Playfair Display',
          }}
        />
      </ListItemButton>
      <Divider />

      <ListItemButton
        onClick={() => {
          navigate('/Farm');
        }}
        sx={{ paddingTop: 1 }}
      >
        <ListItemIcon>
          <YardIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Farm"
          primaryTypographyProps={{
            m: 1,
            pl: 3,
            fontSize: '25px',
            fontWeight: '900',
            fontFamily: 'Playfair Display',
          }}
        />
      </ListItemButton>
      <Divider />

      <ListItemButton
        onClick={() => {
          navigate('/Farm/Booth/plantIntro');
        }}
        sx={{ paddingTop: 1 }}
      >
        <ListItemIcon>
          <FavoriteBorderIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Plant"
          primaryTypographyProps={{
            m: 1,
            pl: 3,
            fontSize: '25px',
            fontWeight: '900',
            fontFamily: 'Playfair Display',
          }}
        />
      </ListItemButton>
    </List>
  );
}
