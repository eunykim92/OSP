import React from 'react';
import Container from '@mui/material/Container';
import HorizontalStepper from './HorizontalStepper';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../utils/reducers/appSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MainContainer() {
  const message = useSelector((state) => state.app.message);
  const dispatch = useDispatch();
  return (
    <Container>
      <HorizontalStepper />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(message)}
        onClose={() => dispatch(reset())}
        autoHideDuration={6000}
      >
        {message && <Alert severity={message.severity}>{message.text}</Alert>}
      </Snackbar>
    </Container>
  );
}
