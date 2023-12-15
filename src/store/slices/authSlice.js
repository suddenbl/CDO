import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: JSON.parse(window.localStorage.getItem('user')) || {},
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      window.localStorage.setItem('user', JSON.stringify(state.user));
      state.isLogged = true;
    },
    logout(state) {
      state.user = {};
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
