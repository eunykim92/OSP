import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import DesignCard from './DesignCard';

export default function UserDesigns() {
  const userDesigns = useSelector((state) => state.app.userDesigns);
  console.log(userDesigns);
  return (
    <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={2}>
      {userDesigns.map((design) => (
        <DesignCard design={design} key={design._id} />
      ))}
    </Box>
  );
}
