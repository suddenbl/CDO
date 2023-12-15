import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import studentSlice from './slices/studentSlice';
import teacherSlice from './slices/teacherSlice';
import empoloyeeSlice from './slices/empoloyeeSlice';
import addonSlice from './slices/addonSlice';

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    teacher: teacherSlice,
    employee: empoloyeeSlice,
    addon: addonSlice,
  },
});
/* eslint-enable */

export default store;
