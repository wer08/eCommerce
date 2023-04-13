import { createSlice } from '@reduxjs/toolkit';
import { TItemInCart } from './types';

interface CartState {
  items: TItemInCart[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
