import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/authSlice";
import bookReducer from './slices/BookSlice';
import bucketReducer from './slices/BucketSlice';
import checkoutReducer from './slices/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    book:bookReducer,
    bucket: bucketReducer,
    checkout: checkoutReducer,
  },
});
