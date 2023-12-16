import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import studentSlice from './slices/studentSlice';
import teacherSlice from './slices/teacherSlice';
import empoloyeeSlice from './slices/empoloyeeSlice';
import addonSlice from './slices/addonSlice';
import eventSlice from './slices/eventSlice';

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    teacher: teacherSlice,
    employee: empoloyeeSlice,
    event: eventSlice,
  },
});
/* eslint-enable */

export default store;
