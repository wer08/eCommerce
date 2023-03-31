import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'


// Define a type for the slice state
type TUser = {
  username: string,
  id: number,
  email: string,
}
interface usersState{
  users: TUser[],
  status: string,
  error: string | null
}

// Define the initial state using that type
const initialState: usersState = {
  users: [],
  status: "idle",
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
})



// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer