import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import placesReducer from '../features/places/placesSlice'


export const store = configureStore({
  reducer: {
   auth:authReducer,
   places:placesReducer
  },
});
