import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import type { authState, TPayloadLogin, TPayloadActivate} from './types'




// Define the initial state using that type
const initialState: authState = {
    access: "",
    refresh: "",
    isAuthenticated: false,
    status: 'idle',
    error: null,
    user: null
}

export const login = createAsyncThunk('auth/login', async (payload:TPayloadLogin) => {
  const config = {
    headers: {
        'Content-Type': 'application/json',
    } 
    };
  const {username,password} = payload

  const body = JSON.stringify({username, password});

  try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`,body,config);
    return response.data
  }catch(error: any){
    throw error.message;
  }
})

export const activate = createAsyncThunk('auth/activate', async (payload:TPayloadActivate) => {
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const {uid,token} = payload
  const body = JSON.stringify({uid,token});
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`,body,config)
  }catch(error: any){
    throw error.message
  }
}) 

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers(builder){
    builder
      .addCase(login.pending, (state,action) => {
          state.status = 'loading'
      })
      .addCase(login.fulfilled, (state,action: PayloadAction<authState>) => {
        localStorage.setItem('access',action.payload.access);
        localStorage.setItem('refresh',action.payload.refresh);
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.access = action.payload.access
        state.refresh = action.payload.refresh
        state.error = null
      })
      .addCase(login.rejected, (state,action) => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        state.status = "failed"   
        state.isAuthenticated = false
        state.access = ""
        state.refresh = ""
        state.user
        state.error = action.error.message
        state.user = null
      })
    builder
      .addCase(activate.pending, (state,action) => {
          state.status = 'loading'
      })
      .addCase(activate.fulfilled, (state,action) => {
          state.status = 'succeeded'
      })
      .addCase(activate.rejected, (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
      })
    
  }
})


// Other code such as selectors can use the imported `RootState` type
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export default authSlice.reducer