import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './reducers/roomReducer';
import locationReducer from './reducers/locationReducer';


export const store = configureStore({
  reducer: {
    locationReducer: locationReducer,
    roomReducer: roomReducer,
  }
});

export type RootState = ReturnType<typeof store.getState> 

export type DispatchType = typeof store.dispatch;