import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  arr: [],
};
export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
