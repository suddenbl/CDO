import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLogged: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isLogged = true
    },
    logout(state) {
      state.user = {}
      state.isLogged = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
