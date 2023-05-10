import { createSlice } from '@reduxjs/toolkit';
import { TItemInCart } from './types';
import type { RootState } from '../../store'

interface CartState {
  items: TItemInCart[];
}

const items = localStorage.getItem('items');
const initialState: CartState = {
  items: items ? JSON.parse(items) : [],
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantityCart += newItem.quantityCart;
      } else {
        state.items.push(newItem);
      }
      localStorage.setItem('items',JSON.stringify(state.items))
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      }
      localStorage.setItem('items',JSON.stringify(state.items))
    },
    clearCart(state) {
      localStorage.removeItem('items');
      state.items = [];
      localStorage.setItem('items',JSON.stringify(state.items))
    },

  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const getNumberOfItems = (state: RootState) => state.cart.items.length;

export default cartSlice.reducer;
