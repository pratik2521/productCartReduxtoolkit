import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItem, updateItems, deleteItems } from "./CartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchAysnc = createAsyncThunk("cart/fetchCount", async () => {
  const response = await fetchItems();
  // The value we return becomes the `fulfilled` action payload
  console.log(response);
  return response.data;
});
export const addAysnc = createAsyncThunk(
  "cart/additem",
  async (item, thunkAPI) => {
    const { id, title, brand, thumbnail, price } = item;
    console.log("thunkAPI", thunkAPI);
    const response = await addItem({
      id,
      title,
      brand,
      thumbnail,
      price,
      quantity: 1,
    });
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response.data;
  }
);

export const deleteAysnc = createAsyncThunk("cart/deleteItem", async (item) => {
  const { id } = item;
  await deleteItems(id);
  return id;
});
export const updateAysnc = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItems(id, change);
    console.log("res",response)
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
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
        state.items = action.payload;
      })
      .addCase(deleteAysnc.fulfilled, (state, action) => {
        console.log(action); // Logging the action for debugging purposes
        state.status = "idle"; // Setting the status to "idle"
        const indexNumber = state.items.findIndex((item) => {
          return item.id === action.payload; // Finding the index of the item with the matching id
        });
        state.items.splice(indexNumber, 1); // Removing items from index 0 up to indexNumber (excluding indexNumber)
      })
      .addCase(updateAysnc.fulfilled, (state, action) => {
        console.log(action);
        state.status = "idle";
        const indexNumber = state.items.findIndex((item) => {
          return item.id === action.payload.id;
        });
        state.items.splice(indexNumber, 1, action.payload);
      });
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

export default cartSlice.reducer;
