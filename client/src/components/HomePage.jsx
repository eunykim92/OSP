import React from 'react';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useDispatch } from 'react-redux';
import { goToPage } from '../utils/reducers/appSlice';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  if (user)
    return (
      <Box display='grid' gridTemplateColumns='1fr 1fr' gap={2}>
        <Typography variant='h4' gridColumn='span 2'>
          Welcome back, {user.username}
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => dispatch(goToPage('NEW_DESIGN'))}
        >
          New Design
        </Button>
        <Button
          variant='contained'
          startIcon={<BackupTableIcon />}
          onClick={() => dispatch(goToPage('PAST_DESIGNS'))}
        >
          Past Designs
        </Button>
      </Box>
    );
}
