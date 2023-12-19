import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import studentSlice from './slices/studentSlice';
import teacherSlice from './slices/teacherSlice';
import eventSlice from './slices/eventSlice';
import accountantSlice from './slices/accountantSlice';
import unionSlice from './slices/unionSlice';
import rectorSlice from './slices/rectorSlice';
import groupSlice from './slices/groupSlice';
import adminSlice from './slices/adminSlice';

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
    teacher: teacherSlice,
    accountant: accountantSlice,
    union: unionSlice,
    rector: rectorSlice,
    event: eventSlice,
    group: groupSlice,
    admin: adminSlice,
  },
});
/* eslint-enable */

export default store;
