import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unionID: 0,
  fullNameUnion: 'string',
  contactMailUnion: 'string',
  contactPhoneUnion: 'string',
  authToken: 0,
  jobID: 0,
  jobTitles: {},
}

export const unionSlice = createSlice({
  name: 'union',
  initialState,
  reducers: {
    setUnion: (state, action) => {
      state.unionID = action.payload.employeeID
      state.fullNameUnion = action.payload.fullNameEmployee
      state.contactMailUnion = action.payload.contactMailEmployee
      state.contactPhoneUnion = action.payload.contactPhoneEmployee
      state.authToken = action.payload.authToken
      state.jobID = action.payload.jobID
      state.jobTitles = action.payload.jobTitles
    },
  },
})

export const { setUnion } = unionSlice.actions
export default unionSlice.reducer
