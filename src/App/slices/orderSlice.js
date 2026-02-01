// src/App/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import databaseService from "../../appwrite/database"

// Thunk: place order (handles both single book and multi-item)
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ items, source, total }, { rejectWithValue }) => {
    try {
      // 1. Create the main order document
      const mainOrder = await databaseService.createOrder(total, source);

      // 2. Create order items for each book
      for (const item of items) {
        await databaseService.createOrderItem(
          mainOrder.$id,           // link to the main order
          item,
          item.quantity || 1
        );
      }

      return mainOrder; // return the created order for success handling
    } catch (error) {
      console.error('Order creation failed:', error);
      return rejectWithValue(error.message || 'Failed to place order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;