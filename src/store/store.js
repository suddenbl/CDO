import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import studentSlice from './slices/studentSlice'
import teacherSlice from './slices/teacherSlice'

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    teacher: teacherSlice,
  },
})
/* eslint-enable */

export default store
