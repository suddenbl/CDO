import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import studentSlice from './slices/studentSlice'
import teacherSlice from './slices/teacherSlice'
import addonSlice from './slices/addonSlice'
import eventSlice from './slices/eventSlice'
import accountantSlice from './slices/accountantSlice'
import unionSlice from './slices/unionSlice'

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    teacher: teacherSlice,
    accountant: accountantSlice,
    union: unionSlice,
    event: eventSlice,
  },
})
/* eslint-enable */

export default store
