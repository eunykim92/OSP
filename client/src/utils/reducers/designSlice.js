import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userImage: null,
  components: [],
  created_at: null,
  // i added this
  selectedComponent: null,
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
        styles: { position: 'relative', height: '100vh', width: '100vw' },
        props: {},
        hooks: {},
      };
      if (state.components.length === 0) {
        state.components = [...state.components, mainContainer];
        state.created_at = new Date().toISOString();
      }
      console.log('state.components in design Slice are', state.components);
    },
    addComponent: (state, action) => {
      const newComponent = {
        name: action.payload,
        parent: 0,
        x_position: 0,
        y_position: 0,
        z_index: 0,
        props: {},
        hooks: {},
        styles: { position: 'absolute' },
        created_at: new Date().toISOString(),
      };
      state.components = [...state.components, newComponent];
    },
    setParent: (state, action) => {
      const { childIdx, parentIdx } = action.payload;
      state.components = state.components.map((item, idx) =>
        idx !== childIdx ? item : { ...item, parent: parentIdx }
      );
    },
    removeComponent: (state, action) => {
      const idx = action.payload;
      state.components.splice(idx, 1);
    },
    // i added this
    selectComponent: (state, action) => {
      state.selectedComponent = action.payload;
    }
  },
});

export const { startDesign, addComponent, setParent, removeComponent, selectComponent } =
  designSlice.actions;

export default designSlice.reducer;
