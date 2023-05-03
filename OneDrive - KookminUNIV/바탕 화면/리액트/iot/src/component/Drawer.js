import Drawer from '@mui/material/Drawer';
import * as React from 'react';

import { Box, Button } from '@material-ui/core';
import NestedList from './NestedList';
import MenuIcon from '@mui/icons-material/Menu';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NestedList></NestedList>
    </Box>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer('left', true)}>
        <MenuIcon sx={{ color: '#7B95B7', fontSize: 50, align: 'center' }} />
      </Button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </React.Fragment>
  );
}
