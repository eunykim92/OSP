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
      const mainContainer = {
        name: 'MainContainer',
        parent: null,
        x_position: 0,
        y_position: 0,
        z_index: 0,
        styles: { position: 'relative', height: '100vh', width: '100wh' },
        props: {},
        hooks: {},
      };
      if (state.components.length === 0) {
        state.components = [...state.components, mainContainer];
      }
      console.log('state.components in design Slice are', state.components);
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
        styles: { position: 'absolute' },
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
