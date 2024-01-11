import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import UserMenu from './UserMenu';
import DarkModeSwitch from './DarkModeSwitch';

export default function TopBar({ toggleDarkMode }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>Reactraft</Typography>
        <UserMenu />
        <DarkModeSwitch toggleDarkMode={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
}
