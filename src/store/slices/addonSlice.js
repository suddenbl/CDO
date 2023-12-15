import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  arr: [],
};
export const addonSlice = createSlice({
  name: 'addon',
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { setAddon } = addonSlice.actions;
export default addonSlice.reducer;
