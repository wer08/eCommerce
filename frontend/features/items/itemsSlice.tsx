import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import {TItem, TItemUpload, TItemsState} from './types'




// Define the initial state using that type
const initialState: TItemsState = {
  items: [],
  status: "idle",
  currentCart: [],
  error: null
}

export const getItems = createAsyncThunk('items/getItems',async ()=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items/all`)
    return res.data
  }catch(error:any){
    throw error.message
  }
})

export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData: TItemUpload) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/items/add`;

    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('description', itemData.description);
    formData.append('price', itemData.price.toString());
    if (itemData.picture){
      formData.append('picture', itemData.picture);
    }

    const config = {
      headers:{
        'enctype': "multipart/form-data"
      }

    }

    try {
      const res = await axios.post(apiUrl, formData,config);

      return res.data;
    } catch (error:any) {
      throw error.message
    }
  }
);



export const itemsSlice = createSlice({
  name: 'items',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
    .addCase(getItems.fulfilled,(state,action)=>{
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
    .addCase(addItem.fulfilled,(state,action)=>{
      state.status = 'success'
    })
    .addCase(addItem.pending,(state,action)=>{
      state.status = 'pending'
    })
    .addCase(addItem.rejected,(state,action)=>{
      state.status = 'failed'
      state.error = action.error.message
    }) 
    
  },
})



// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.items.items

export default itemsSlice.reducer