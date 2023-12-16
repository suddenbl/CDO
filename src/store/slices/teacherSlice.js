import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullNameTeacher: 'string',
  contactMailTeacher: 'string',
  contactPhoneTeacher: 'string',
  id: null,
  authToken: null,
  jobTitles: {},
  lessons: [],
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacher: (state, action) => {
      state.name = action.payload.fullNameTeacher
      state.contactMail = action.payload.contactMailTeacher
      state.contactPhone = action.payload.contactPhoneTeacher
      state.id = action.payload.teacherID
      state.authToken = action.payload.authToken
      state.jobTitles = action.payload.jobTitles
      state.group = action.payload.group
      state.lessons = action.payload.lessons
    },
  },
})

export const { setTeacher } = teacherSlice.actions
export default teacherSlice.reducer
