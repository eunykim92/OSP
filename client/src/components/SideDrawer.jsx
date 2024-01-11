import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeIcon from '@mui/icons-material/Home';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { Label } from '@mui/icons-material';

export default function SideDrawer({ drawerOpen, setDrawerOpen }) {
  const [value, setValue] = useState(0);

  return (
    <Drawer sx={{ width: 200 }} anchor='left' open={drawerOpen}>
      <Button onClick={() => setDrawerOpen(false)}>
        <ChevronLeftIcon />
      </Button>
      <Divider />
      <Tabs
        orientation='vertical'
        variant='scrollable'
        onChange={(_, val) => setValue(val)}
        value={value}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={<AddPhotoAlternateIcon />} label='New Design' />
        <Tab icon={<HomeIcon />} label='Home' />
        <Tab icon={<BackupTableIcon />} label='Past Desgins' />
      </Tabs>
    </Drawer>
  );
}