import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentId: 0,
  name: 'string',
  groupName: 'string',
  gender: false,
  authToken: 0,
  age: 0,
  admissionTime: 'string',
  contactMailStudent: 'string',
  contactPhoneStudent: 'string',
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.id = action.payload.studentId
      state.name = action.payload.fullNameStudent
      state.groupName = ''
      state.gender = action.payload.gender
      state.authToken = action.payload.authToken
      state.age = action.payload.age
      state.admissionTime = action.payload.admissionTime
      state.contactMail = action.payload.contactMailStudent
      state.contactPhone = action.payload.contactPhoneStudent
    },
    setGroup: (state, action) => {
      state.groupName = action.payload.groupName
    },
  },
})

export const { setStudent, setGroup } = studentSlice.actions
export default studentSlice.reducer
