import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'string',
  group: 'string',
  id: 0,
  age: 0,
  admissionTime: 'string',
  contactMail: 'string',
  contactPhone: 'string',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.group = action.payload.group;
      state.id = action.payload.id;
      state.age = action.payload.age;
      state.admissionTime = action.payload.admissionTime;
      state.contactMail = action.payload.contactMail;
      state.contactPhone = action.payload.contactPhone;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
