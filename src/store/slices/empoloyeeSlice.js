import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employeeID: 0,
  fullNameEmployee: 'stirng',
  contactMailEmployee: 'stirng',
  contactPhoneEmployee: 'stirng',
  authToken: 0,
  jobID: 0,
};

export const studentSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employeeID = action.payload.employeeID;
      state.fullNameEmployee = action.payload.fullNameEmployee;
      state.contactMailEmployee = action.payload.contactMailEmployee;
      state.contactPhoneEmployee = action.payload.contactPhoneEmployee;
      state.authToken = action.payload.authToken;
      state.jobID = action.payload.jobID;
    },
  },
});

export const { setEmployee } = studentSlice.actions;
export default studentSlice.reducer;
