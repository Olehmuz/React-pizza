import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (currentItem) {
        currentItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((summ,obj) => summ + (obj.count * obj.price),0);
    },
    removeItem: (state, action) => {
      state.totalPrice -=(action.payload.price * action.payload.count);
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    decreaseItem: (state, action) => {
      const decreasingItem = state.items.find(
        (obj) => obj.id === action.payload
      );
      if (decreasingItem && decreasingItem.count > 1) {
        decreasingItem.count--;
        state.totalPrice -= decreasingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

export const selectCart = (state) => state.cartSlice;

export const { addItem, totalPrice, removeItem, decreaseItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
