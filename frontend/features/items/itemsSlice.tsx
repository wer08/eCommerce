import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob'
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
    return res.data.data
  }catch(error:any){
    throw error.message
  }
})

export const addItem = createAsyncThunk(
  'items/save',
  async (itemData: TItemUpload) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/item/save`;
    let body = {};
    console.log(import.meta.env.VITE_AZURE_SAS_TOKEN);
    if(itemData.picture){
      
      const sasToken = import.meta.env.VITE_AZURE_SAS_TOKEN;
      const containerName = 'items';
      const storageAccountName = 'wojtekstorage'
      const fileName = itemData.picture.name;
      const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
      const blobUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;
      console.log(uploadUrl);

      try{
              
        // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
        const blobService = new BlobServiceClient(uploadUrl);
        
        // get Container - full public read access
        const containerClient: ContainerClient = blobService.getContainerClient(containerName);

        const blobClient = containerClient.getBlockBlobClient(fileName);

        const options = { blobHTTPHeaders: { blobContentType: itemData.picture.type } };

        await blobClient.uploadData(itemData.picture, options);

      }catch(e:any){
        console.log(e);
      }
      body= {...body,picture: blobUrl}



    }
    else{
      body = {...body,picture: "https://wojtekstorage.blob.core.windows.net/items/eCommerceNoPicture06fc1920-de78-11ed-b693-1356169cbdae.jpg"}
    }
    body = {
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      quantity: itemData.quantity,
      client: itemData.user,
      ...body
    }


    const config = {
      headers:{
        'content-type': "application/json"
      }

    }
    console.log(body);
    try {
      
      const res = await axios.post(apiUrl,body,config);

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