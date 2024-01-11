import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import WorkspaceLeft from './WorkspaceLeft';

export default function Workspace() {
  const userImage = useSelector((state) => state.design.userImage);
  console.log('Step2-workspace');
  return (
    <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
      <Box gridColumn='span 2'>
        <WorkspaceLeft />
      </Box>
      <Box gridColumn='span 8'>
        <img src={userImage} style={{ maxWidth: '100%' }} />
      </Box>
      <Box gridColumn='span 2'></Box>
    </Box>
  );
}
