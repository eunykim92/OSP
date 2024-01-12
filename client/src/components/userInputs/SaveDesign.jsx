import React, { useState } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { addDesign } from '../../utils/fetchRequests';
import { resetStep, setMessage } from '../../utils/reducers/appSlice';
import { resetDesign } from '../../utils/reducers/designSlice';

export default function SaveDesign() {
  const { userImage, created_at, components } = useSelector(
    (state) => state.design
  );
  const [stage, setStage] = useState('before');
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant='contained'
        startIcon={<PublishIcon />}
        disabled={stage !== 'before'}
        onClick={async () => {
          setStage('saving');
          const body = { userImage, created_at };
          body.componentsStr = JSON.stringify(
            components.map((item, i) => ({ ...item, index: i }))
          );
          try {
            const response = await addDesign(body);
            setStage('saved');
            dispatch(
              setMessage({
                severity: 'success',
                text: 'Design saved successfully.',
              })
            );
            setTimeout(() => {
              dispatch(resetStep());
              dispatch(resetDesign());
            }, 2000);
            console.log(response);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {stage === 'saving' ? <CircularProgress /> : 'Save your design'}
      </Button>
    </Box>
  );
}
