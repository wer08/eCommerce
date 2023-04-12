import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'


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

export const getUsers = createAsyncThunk('users/getUsers',async ()=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/all`)
    return res.data
  }catch(error:any){
    throw error.message
  }
})

export const getUser = createAsyncThunk('users/getUser', async (id:number)=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user?id=${id}`)
    return res.data
  }catch(error:any){
    throw error.message
  }
})

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