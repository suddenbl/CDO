import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminID: 0,
  fullNameAdmin: 'string',
  contactMailAdmin: 'string',
  contactPhoneAdmin: 'string',
  authToken: 0,
  jobID: 0,
  jobTitles: {},
  students: [],
  // groups: [],
  teachers: [],
  jobs: [],
  employees: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.adminID = action.payload.employeeID;
      state.fullNameAdmin = action.payload.fullNameEmployee;
      state.contactMailAdmin = action.payload.contactMailEmployee;
      state.contactPhoneAdmin = action.payload.contactPhoneEmployee;
      state.authToken = action.payload.authToken;
      state.jobID = action.payload.jobID;
      state.jobTitles = action.payload.jobTitles;
    },
    setStudent: (state, action) => {
      state.students = action.payload;
    },
    // setGroup: (state, action) => {
    //   state.groups = action.payload;
    // },
    setTeacher: (state, action) => {
      state.teachers = action.payload;
    },
    setJob: (state, action) => {
      state.jobs = action.payload;
    },
    setEmployee: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { setAdmin, setStudent, setTeacher, setJob, setEmployee } = adminSlice.actions;
export default adminSlice.reducer;
