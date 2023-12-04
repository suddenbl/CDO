import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullNameTeacher: 'string',
  contactMailTeacher: 'string',
  contactPhoneTeacher: 'string',
  teacherId: 0,
  authToken: 0,
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
      state.fullNameTeacher = action.payload.fullNameTeacher
      state.contactMailTeacher = action.payload.contactMailTeacher
      state.contactPhoneTeacher = action.payload.contactPhoneTeacher
      state.teacherId = action.payload.teacherId
      state.authToken = action.payload.authToken
      state.jobId = action.payload.jobId
    },
  },
})

export const { setTeacher } = teacherSlice.actions
export default teacherSlice.reducer
