import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rectorID: 0,
  fullNameRector: 'string',
  contactMailRector: 'string',
  contactPhoneRector: 'string',
  authToken: 0,
  jobID: 0,
  jobTitles: {},
  subjectList: [],
};

export const rectorSlice = createSlice({
  name: 'rector',
  initialState,
  reducers: {
    setRector: (state, action) => {
      state.rectorID = action.payload.employeeID;
      state.fullNameRector = action.payload.fullNameEmployee;
      state.contactMailRector = action.payload.contactMailEmployee;
      state.contactPhoneRector = action.payload.contactPhoneEmployee;
      state.authToken = action.payload.authToken;
      state.jobID = action.payload.jobID;
      state.jobTitles = action.payload.jobTitles;
    },
    setSubjectList: (state, action) => {
      state.subjectList = action.payload;
    },
  },
});

export const { setRector, setSubjectList } = rectorSlice.actions;
export default rectorSlice.reducer;
