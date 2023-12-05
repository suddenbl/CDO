import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullNameTeacher: 'string',
  contactMailTeacher: 'string',
  contactPhoneTeacher: 'string',
  teacherId: null,
  authToken: null,
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
      state.name = action.payload.fullNameTeacher
      state.contactMail = action.payload.contactMailTeacher
      state.contactPhone = action.payload.contactPhoneTeacher
      state.id = action.payload.teacherId
      state.authToken = action.payload.authToken
      state.jobId = action.payload.jobId
    },
  },
})

export const { setTeacher } = teacherSlice.actions
export default teacherSlice.reducer
