import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import { BlobServiceClient } from '@azure/storage-blob'
import {TItem, TItemUpload, TItemsState} from './types'




// Define the initial state using that type
const initialState: TItemsState = {
  items: [],
  status: "idle",
  currentCart: [],
  error: null
}

export const getItems = createAsyncThunk('items/list',async ()=>{
  try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/item/list`)
    console.log(res.data.data)
    return res.data.data
  }catch(error:any){
    throw error.message
  }
})

export const addItem = createAsyncThunk(
  'items/save',
  async (itemData: TItemUpload) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/item/save`;
    const formData = new FormData();
    if(itemData.picture){
      const blobServiceClient = BlobServiceClient.fromConnectionString(import.meta.env.VITE_AZURE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient('items');
      const blobName = itemData.picture.name;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
      await blockBlobClient.uploadData(itemData.picture,{
        blobHTTPHeaders: { blobContentType: itemData.picture.type}
      })

      formData.append('picture', blockBlobClient.url)

    }


  
    formData.append('name', itemData.name);
    formData.append('description', itemData.description);
    formData.append('price', itemData.price.toString());
    formData.append('quantity', itemData.quantity.toString());
    formData.append('user',JSON.stringify(itemData.user))

    const config = {
      headers:{
        'enctype': "multipart/form-data"
      }

    }

    try {
      const res = await axios.post(apiUrl, formData,config);

      return res.data.data;
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