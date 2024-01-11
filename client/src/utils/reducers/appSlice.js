import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
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
  },
});

export const { setMessage, reset } = appSlice.actions;

export default appSlice.reducer;
