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

      // state.lessons = action.payload.lessons
    },
    setLessons: (state, action) => {
      state.lessons = action.payload
    },
    setGroup: (state, action) => {
      // Проверяем, существует ли уже группа с таким groupID
      const existingGroupIndex = state.group.findIndex(
        (group) => group.groupID === action.payload.groupID,
      )

      // Если группа существует, обновляем ее данные
      if (existingGroupIndex !== -1) {
        state.group[existingGroupIndex] = action.payload
      } else {
        // Иначе добавляем новую группу
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
