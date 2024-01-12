import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  activeStep: 0,
};

const appSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    reset: (state) => {
      state.message = null;
    },
    nextStep: (state) => {
      state.activeStep += 1;
    },
    prevStep: (state) => {
      state.activeStep -= 1;
    },
    resetStep: (state) => {
      state.activeStep = 0;
    },
  },
});

export const { setMessage, reset, nextStep, prevStep, resetStep } =
  appSlice.actions;

export default appSlice.reducer;
