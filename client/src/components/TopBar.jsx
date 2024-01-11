import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import UserMenu from './UserMenu';

export default function TopBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>Reactraft</Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
