import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeIcon from '@mui/icons-material/Home';
import BackupTableIcon from '@mui/icons-material/BackupTable';

export default function SideBar() {
  const [value, setValue] = useState(0);

  return (
    <Tabs
      orientation='vertical'
      variant='scrollable'
      onChange={(_, val) => setValue(val)}
      value={value}
      aria-label='Vertical tabs example'
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      <Tab icon={<AddPhotoAlternateIcon />} />
      <Tab icon={<HomeIcon />} />
      <Tab icon={<BackupTableIcon />} />
    </Tabs>
  );
}
