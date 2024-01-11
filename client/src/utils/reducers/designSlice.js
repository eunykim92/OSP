import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userImage: null,
  components: [],
  created_at: null,
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
        styles: [
          { key: 'height', value: '100vh' },
          { key: 'width', value: '100vw' },
        ],
        props: [],
        hooks: [],
      };
      if (state.components.length === 0) {
        state.components = [...state.components, mainContainer];
        state.created_at = new Date().toISOString();
      }
    },
    addComponent: (state, action) => {
      const newComponent = {
        name: action.payload,
        parent: 0,
        x_position: 0,
        y_position: 0,
        z_index: 0,
        props: [],
        hooks: [],
        styles: [],
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
    updateComponent: (state, action) => {
      const { idx, updatedComponent } = action.payload;
      state.components = state.components.map((item, i) =>
        i !== idx ? item : Object.assign(item, updatedComponent)
      );
    },
  },
});

export const {
  startDesign,
  addComponent,
  setParent,
  removeComponent,
  updateComponent,
} = designSlice.actions;

export default designSlice.reducer;
