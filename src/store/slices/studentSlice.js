import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentId: 0,
  name: 'string',
  gender: false,
  authToken: 0,
  age: 0,
  contactMail: 'string',
  contactPhone: 'string',
  budget: true,
  payments: [],
  journal: [],
  group: 'string',
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.studentId = action.payload.studentID;
      state.name = action.payload.fullNameStudent;
      state.gender = action.payload.gender;
      state.authToken = action.payload.authToken;
      state.age = action.payload.age;
      state.contactMail = action.payload.contactMailStudent;
      state.contactPhone = action.payload.contactPhoneStudent;
      state.budget = action.payload.budget;
      state.payments = action.payload.payments;
      state.journal = action.payload.journal;
      state.group = action.payload.group.groupName;
    },
    setPhone: (state, action) => {
      state.contactPhone = action.payload;
    },
    setMail: (state, action) => {
      state.contactMail = action.payload;
    },
  },
});

export const { setStudent, setPhone, setMail } = studentSlice.actions;
export default studentSlice.reducer;
