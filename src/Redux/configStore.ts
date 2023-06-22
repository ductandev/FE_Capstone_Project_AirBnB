import { configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import productReducer, { ProductState } from './reducers/productReducer';
import userReducer, { UserState } from './reducers/userReducer';
import cartReducer, { CartState } from './reducers/cartReducer';

export interface RootState {
  productReducer: ProductState;
  userReducer: UserState;
  cartReducer: CartState;
}

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    cartReducer: cartReducer,
  }
});

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type DispatchType = typeof store.dispatch;
