import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import usersReducer from './features/users/usersSlice'
import itemsReducer from './features/items/itemsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    items: itemsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch