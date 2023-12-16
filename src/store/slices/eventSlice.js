import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  arr: [],
};
export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.arr = action.payload;
    },
  },
});
export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;
