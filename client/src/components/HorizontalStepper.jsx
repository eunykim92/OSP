import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserImageUpload from './UserImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import Workspace from './Workspace';
import { startDesign } from '../utils/reducers/designSlice';

const steps = [
  'Upload your design',
  'Create React components',
  'Save your design',
];

export default function HorizontalStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const userImage = useSelector((state) => state.design.userImage);
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && userImage && (
        <img src={userImage} style={{ maxWidth: '100%' }} />
      )}
      {activeStep === 0 && <UserImageUpload />}
      {activeStep === 1 && <Workspace />}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color='inherit'
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

        <Button
          onClick={() => {
            setActiveStep(activeStep + 1);
            if (activeStep === 0 && !userImage) {
              dispatch(startDesign(null));
            }
          }}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
