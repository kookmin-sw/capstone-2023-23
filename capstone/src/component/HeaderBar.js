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

//Drawer
import TemporaryDrawer from './Drawer';

export default function HeaderBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <TemporaryDrawer></TemporaryDrawer>

          <Typography
            // variant="h1"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              fontSize: 29,
              letterSpacing: '.3rem',
              paddingLeft: '85px',
              color: '#486284',
            }}
          >
            Chorok-i
          </Typography>

          <div>
            <IconButton>
              <NotificationsIcon
                sx={{
                  color: '#7B95B7',
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
                  color: '#7B95B7',
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
