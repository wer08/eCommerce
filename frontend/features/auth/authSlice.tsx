import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import type { authState, TArgLogin, GoogleUser, TArgSignUp, TGoogleArg, TSignUpFormData} from './types'
import jwtDecode from 'jwt-decode'
axios.defaults.withCredentials = true;




// Define the initial state using that type
const initialState: authState = {
    access: localStorage.getItem('access'),
    isAuthenticated: false,
    status: 'idle',
    error: null,
    user: null
}

export const signUp = createAsyncThunk('auth/signUp', async(arg:TSignUpFormData)=>{
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const {firstName,lastName,username,email,password,rePassword} = arg
  const body = JSON.stringify({
    firstName,
    lastName,
    username,
    email,
    password
  }); 
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/signUp`,body,config)
  }catch(error:any){
    throw error.message
  }
})

export const googleAuthenticate = createAsyncThunk('auth/google', async (arg: TGoogleArg) => {
  const {jwt,password} = arg
  const user:GoogleUser = jwtDecode(jwt)
  const body = {
    username: user.email,
    email: user.email,
    password: password,
    firstName: user.given_name,
    lastName: user.family_name
  }
  console.log(user)
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/signUp`,body,config)
  }catch(error:any){
    throw error.message
  }
})



export const login = createAsyncThunk('auth/login', async (arg:TArgLogin) => {
  const config = {
    headers: {
        'Content-Type': 'application/json'
    } 
    };
  const {username,password} = arg

  const body = JSON.stringify({username, password});

  try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,body,config);
    return response.data
  }catch(error: any){
    throw error.message;
  }
})

export const auth = (response:any) => {
  console.log(response)
}

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  if (localStorage.getItem('access')){
    const token = localStorage.getItem('access')
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Jwt-Token': `${token}`,
          'Accept': 'application/json',
      }
  };
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/loadUser`,config)
      return res.data

    }
    catch(error:any){
      throw error.massage
    }
  }
  else{
    throw new Error('no access token')
  }
})




export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access');
     
      state.status = "idle";
      state.isAuthenticated = false;
      state.access = null
      state.user = null
    },

  },
  extraReducers(builder){

    builder  

      .addCase(signUp.fulfilled,(state,action)=>{
        state.status = 'success'
        state.isAuthenticated = false
      })
      .addCase(googleAuthenticate.fulfilled,(state,action)=>{
        state.status = 'success'
        state.isAuthenticated = false
      })
      .addCase(loadUser.fulfilled, (state,action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload.data.user
      })
      .addCase(loadUser.rejected, (state,action) => {
          localStorage.removeItem('access')
          state.status = 'failed'
          state.error = action.error.message
          state.access = null
          state.user = null
      })

    builder
      .addMatcher(isAnyOf(login.fulfilled), (state,action) => {
        localStorage.setItem('access',action.payload.data.token);
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.access = action.payload.data.token
        state.user = action.payload.data.user
        state.error = null
      })

      .addMatcher(isAnyOf(login.rejected,signUp.rejected,googleAuthenticate.rejected),(state,action)=>{
        localStorage.removeItem('access');
        state.status = "failed"   
        state.isAuthenticated = false
        state.access = null
        state.user = null
        state.error = action.error.message
        state.user = null
      })
      .addMatcher(isAnyOf(login.pending,loadUser.pending,loadUser.pending,googleAuthenticate.pending), (state,action) => {
          state.status = 'loading'
      })

    
  }
})

//Action creator 
export const {logout} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const getUser = (state:RootState) => state.auth.user
export const getStatus = (state:RootState) => state.auth.status
export const getError = (state:RootState) => state.auth.error


export default authSlice.reducer