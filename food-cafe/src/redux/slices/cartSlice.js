import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Cart starts empty

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.find((i) => i.id === item.id);

      if (existing) {
        // If item exists, increment its quantity
        existing.qty += item.qty;
      } else {
        state.push({ ...item });
      }
    },
    removeItem: (state, action) =>
      state.filter((i) => i.id !== action.payload),
    clearCart: () => [],
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
