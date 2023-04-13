import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import usersReducer from './features/users/usersSlice'
import itemsReducer from './features/items/itemsSlice'
import cartReducer from './features/cart/cartSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    items: itemsReducer,
    cart: cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch