import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import studentSlice from './slices/studentSlice';

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student: studentSlice,
  },
});
/* eslint-enable */

export default store;
