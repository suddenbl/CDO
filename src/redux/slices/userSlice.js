import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  password: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.userName = null;
      state.password = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
