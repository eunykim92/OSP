import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  activeStep: 0,
  page: 'HOME',
  userDesigns: [],
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
      state.page = 'HOME';
    },
    goToPage: (state, action) => {
      state.page = action.payload;
    },
    setUserDesigns: (state, action) => {
      state.userDesigns = action.payload;
    },
    addToUserDesign: (state, action) => {
      state.userDesigns = [...state.userDesigns, action.payload];
    },
  },
});

export const {
  setMessage,
  reset,
  nextStep,
  prevStep,
  resetStep,
  goToPage,
  setUserDesigns,
  addToUserDesign,
} = appSlice.actions;

export default appSlice.reducer;
