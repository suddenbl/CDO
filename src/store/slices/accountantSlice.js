import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accountantID: 0,
  fullNameAccountant: 'string',
  contactMailAccountant: 'string',
  contactPhoneAccountant: 'string',
  authToken: 0,
  jobID: 0,
}

export const accountantSlice = createSlice({
  name: 'accountant',
  initialState,
  reducers: {
    setAccountant: (state, action) => {
      state.accountantID = action.payload.employeeID
      state.fullNameAccountant = action.payload.fullNameEmployee
      state.contactMailAccountant = action.payload.contactMailEmployee
      state.contactPhoneAccountant = action.payload.contactPhoneEmployee
      state.authToken = action.payload.authToken
      state.jobID = action.payload.jobID
    },
  },
})

export const { setAccountant } = accountantSlice.actions
export default accountantSlice.reducer
