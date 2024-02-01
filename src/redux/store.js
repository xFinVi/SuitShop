import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;