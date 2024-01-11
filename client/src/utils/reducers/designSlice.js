import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userImage: null,
  components: [],
};

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    startDesign: (state, action) => {
      state.userImage = action.payload;
    },
    addComponent: (state, action) => {
      const newComponent = {
        name: action.payload,
        parent: null,
        x_position: 0,
        y_position: 0,
        z_index: 0,
        props: {},
        hooks: {},
        styles: {},
      };
      state.components = [...state.components, newComponent];
    },
    setParent: (state, action) => {
      const { childIdx, parentIdx } = action.payload;
      state.components = state.components.map((item, idx) =>
        idx !== childIdx ? item : { ...item, parent: parentIdx }
      );
    },
  },
});

export const { startDesign, addComponent, setParent } = designSlice.actions;

export default designSlice.reducer;
