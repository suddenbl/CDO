import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'string',
  post: 'string',
  contactMail: 'string',
  contactPhone: 'string',
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
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

export const { setTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
