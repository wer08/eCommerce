import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'


// Define a type for the slice state
type TItem = {
  name: string,
  description: string,
  price: number,
}
interface itemsState{
  items: TItem[],
  status: string,
  error: string | null | undefined
}

// Define the initial state using that type
const initialState: itemsState = {
  items: [],
  status: "idle",
  error: null
}

export const getItems = createAsyncThunk('users/getItems',async ()=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items/all`)
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
  extraReducers(builder) {
    builder.addCase(getItems.fulfilled,(state,action)=>{
      state.status = 'success'
      state.items = action.payload.items
    })
    .addCase(getItems.pending,(state,action)=>{
      state.status = 'pending'
    })
    .addCase(getItems.rejected,(state,action)=>{
      state.status = 'failed'
      state.error = action.error.message
    }) 
  },
})



// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.items.items

export default usersSlice.reducer