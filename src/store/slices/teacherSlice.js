import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullNameTeacher: 'string',
  contactMailTeacher: 'string',
  contactPhoneTeacher: 'string',
  id: null,
  authToken: null,
  lessons: [],
  group: [],
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
      state.jobId = action.payload.jobId
    },
    setLessons: (state, action) => {
      state.lessons = action.payload
    },
    setGroup: (state, action) => {
      const existingGroupIndex = state.group.findIndex(
        (group) => group.groupID === action.payload.groupID,
      )
      if (existingGroupIndex !== -1) {
        state.group[existingGroupIndex] = action.payload
      } else {
        state.group = [...state.group, action.payload]
      }
    },
    setStudentsInGroup: (state, action) => {
      const { groupID, students } = action.payload
      const groupIndex = state.group.findIndex((group) => group.groupID === groupID)
      if (groupIndex !== -1) {
        state.group[groupIndex].students = students
      }
    },
  },
})

export const { setTeacher, setLessons, setGroup, setStudentsInGroup } = teacherSlice.actions
export default teacherSlice.reducer
