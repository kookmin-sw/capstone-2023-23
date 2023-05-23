import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//Drawer
import TemporaryDrawer from './Drawer';

export default function HeaderBar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgb(254,248,247)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          <TemporaryDrawer></TemporaryDrawer>

          <Typography
            // variant="h1"
            component="div"
            sx={{
              letterSpacing: '0.3rem',
              fontFamily: 'Playfair Display',
              flexGrow: 1,
              fontWeight: 900, // 굵은 폰트로 설정
              fontSize: '3rem', // 원하는 크기로 설정

              paddingLeft: '85px',
              paddingTop: '5px',
              paddingBottom: '5px',

              color: 'rgb(50,110,98)',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Chorok-i
          </Typography>

          <div>
            <IconButton>
              <NotificationsIcon
                sx={{
                  color: 'rgb(50,110,98)',
                  fontSize: 45,
                  align: 'center',
                  p: 0.5,
                }}
              />
            </IconButton>
          </div>

          {/* 회원등록 관련 */}

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle
                sx={{
                  color: 'rgb(50,110,98)',
                  fontSize: 50,
                  align: 'center',
                  p: 0.5,
                }}
              />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
