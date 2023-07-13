import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './reducers/roomReducer';
import locationReducer from './reducers/locationReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import bookRoomReducer from './reducers/bookRoomReducer';


export const store = configureStore({
  reducer: {
    locationReducer: locationReducer,
    roomReducer: roomReducer,
    authReducer: authReducer,
    userReducer: userReducer,
    bookRoomReducer: bookRoomReducer,
  }
});

export type RootState = ReturnType<typeof store.getState> 

export type DispatchType = typeof store.dispatch;