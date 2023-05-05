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
  error: string | null | undefined
}

// Define the initial state using that type
const initialState: usersState = {
  users: [],
  status: "idle",
  error: null
}

export const getUsers = createAsyncThunk('user/getUsers',async ()=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/list`)
    return res.data.data
  }catch(error:any){
    throw error.message
  }
})

export const getUser = createAsyncThunk('user/getUser', async (id:number)=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/get/id=${id}`)
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
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled,(state,action)=>{
      state.status = 'success'
      state.users = action.payload.users
    })
    .addCase(getUsers.pending,(state,action)=>{
      state.status = 'pending'
    })
    .addCase(getUsers.rejected,(state,action)=>{
      state.status = 'failed'
      state.error = action.error.message
    }) 
  },
})



// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.users
export const selectUser = (state: RootState, id: number) => state.users.users.find(user => user.id == id)

export default usersSlice.reducer