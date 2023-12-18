import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rectorID: 0,
  fullNameRector: 'string',
  contactMailRector: 'string',
  contactPhoneRector: 'string',
  authToken: 0,
  jobID: 0,
  jobTitles: {},
}

export const rectorSlice = createSlice({
  name: 'rector',
  initialState,
  reducers: {
    setRector: (state, action) => {
      state.rectorID = action.payload.employeeID
      state.fullNameRector = action.payload.fullNameEmployee
      state.contactMailRector = action.payload.contactMailEmployee
      state.contactPhoneRector = action.payload.contactPhoneEmployee
      state.authToken = action.payload.authToken
      state.jobID = action.payload.jobID
      state.jobTitles = action.payload.jobTitles
    },
  },
})

export const { setRector } = rectorSlice.actions
export default rectorSlice.reducer
