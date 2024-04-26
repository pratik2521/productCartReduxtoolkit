import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/CartsSlice'



export const store = configureStore({
  reducer: {
    product: productsReducer,
    cart : cartReducer
  },
});
