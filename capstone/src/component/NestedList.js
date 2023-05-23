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

//router
import { useNavigate } from 'react-router-dom';

export default function NestedList(props) {
  let navigate = useNavigate();

  return (
    <List
      sx={{ width: 300, maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Profile
        </ListSubheader>
      }
    >
      <Divider />
      <ListItemButton
        onClick={() => {
          navigate('/');
        }}
      >
        <ListItemIcon>
          <HomeIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Home"
          primaryTypographyProps={{ m: 1, pl: 3, fontSize: '25px' }}
        />
      </ListItemButton>
      <Divider />

      <ListItemButton
        onClick={() => {
          navigate('/Farm');
        }}
      >
        <ListItemIcon>
          <YardIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Farm"
          primaryTypographyProps={{ m: 1, pl: 3, fontSize: '25px' }}
        />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthIcon style={{ fontSize: '2.5rem' }} />
        </ListItemIcon>
        <ListItemText
          primary="Diary"
          primaryTypographyProps={{ m: 1, pl: 3, fontSize: '25px' }}
        />
      </ListItemButton>
    </List>
  );
}
