import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  fetchProducts } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAysnc = createAsyncThunk(
  "product/fetchCount",
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    console.log(response)
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAysnc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAysnc.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  productsSlice.actions;

export default productsSlice.reducer;
