import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import type { authState, TArgLogin, TArgActivate, TArgPassConfirm, TArgSignUp, TArgSocialAuthenticate, TSocialDetail, User} from './types'




// Define the initial state using that type
const initialState: authState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    status: 'idle',
    error: null,
    user: null
}

export const signUp = createAsyncThunk('auth/signUp', async(arg:TArgSignUp)=>{
  const {username,email,firstName,lastName,password,rePassword} = arg;
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username,email,firstName,lastName,password,rePassword}); 
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`,body,config)
  }catch(error:any){
    throw error.message
  }
})

export const login = createAsyncThunk('auth/login', async (arg:TArgLogin) => {
  const config = {
    headers: {
        'Content-Type': 'application/json',
    } 
    };
  const {username,password} = arg

  const body = JSON.stringify({username, password});

  try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`,body,config);
    return response.data
  }catch(error: any){
    throw error.message;
  }
})

export const checkAuthentication = createAsyncThunk('auth/checkAuthentication', async () => {
  if (localStorage.getItem('access'))
  {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    };
    const body = JSON.stringify({
      token: localStorage.getItem('access')
    })

    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/verify/`,body,config)
      if (res.data.code === 'token_not_valid'){
        throw new Error('token_not_valid')
      }
    }catch(error: any){
      throw error.message
    }
  }
  else{
    throw new Error('no access token');
  }

})

export const facebookAuthenticate = createAsyncThunk('auth/facebookAuthentication', async (arg:TArgSocialAuthenticate)=>{
  const {state,code} = arg;
  if (state && code && !localStorage.getItem('access'))
  {
    const config = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const details: TSocialDetail = {
      'state': state,
      'code': code
    };
    const formBody = Object.keys(details).map(key => encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&');
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/o/facebook/?${formBody}`,config)
      return res.data
    }catch(error:any){
      throw error.message
    }
  }
  else{
    throw new Error('no credentials')
  }
})
export const googleAuthenticate = createAsyncThunk('auth/googleAuthentication', async (arg:TArgSocialAuthenticate)=>{
  const {state,code} = arg;
  if (state && code && !localStorage.getItem('access'))
  {
    const config = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const details: TSocialDetail = {
      'state': state,
      'code': code
    };
    const formBody = Object.keys(details).map(key => encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&');
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/?${formBody}`,config)
      return res.data
    }catch(error:any){
      throw error.message
    }
  }
  else{
    throw new Error('no credentials')
  }
})

export const activate = createAsyncThunk('auth/activate', async (arg:TArgActivate) => {
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const {uid,token} = arg
  const body = JSON.stringify({uid,token});
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`,body,config)
  }catch(error: any){
    throw error.message
  }
}) 

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  if (localStorage.getItem('access'))
  {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json',
      }
    };
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users/me/`,config)
      return res.data

    }catch(error: any){
      throw error.message
    }
  }
})

export const passwordReset = createAsyncThunk('auth/resetPassword', async (email: string) => {
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
      email: email
  })
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password/`,body, config);
  }catch(error:any){
    throw error.message
  }
})

export const passwordResetConfirm = createAsyncThunk('auth/resetPasswordConfirm', async (arg: TArgPassConfirm) => {
  const {uid,token,newPassword,reNewPassword} = arg;
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: reNewPassword
  })
  try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password_confirm/`,body,config)
    return res.data

  }catch(error:any){
    throw error.message
  }

})




export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      state.status = "idle";
      state.isAuthenticated = false;
      state.access = null
      state.refresh = null
      state.user = null
    }
  },
  extraReducers(builder){

    builder  
      .addCase(loadUser.fulfilled, (state,action) => {
          state.status = 'succeeded'
          state.user = action.payload
      })
      .addCase(loadUser.rejected, (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
          state.access = ""
          state.refresh = ""
      })
      .addCase(checkAuthentication.fulfilled, (state,action) => {
          state.status = 'succeeded'
          state.isAuthenticated = true
      })
      .addCase(checkAuthentication.rejected, (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
          state.isAuthenticated = false
      })
      .addCase(signUp.fulfilled,(state,action)=>{
        state.status = 'success'
        state.isAuthenticated = false
      })
    builder
      .addMatcher(isAnyOf(login.fulfilled,facebookAuthenticate.fulfilled,googleAuthenticate.fulfilled), (state,action) => {
        localStorage.setItem('access',action.payload.access);
        localStorage.setItem('refresh',action.payload.refresh);
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.access = action.payload.access
        state.refresh = action.payload.refresh
        state.error = null
      })
      .addMatcher(isAnyOf(activate.fulfilled, passwordReset.fulfilled, passwordResetConfirm.fulfilled), (state,action) => {
          state.status = 'succeeded'
      })
      .addMatcher(isAnyOf(activate.rejected,passwordReset.rejected, passwordResetConfirm.rejected), (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
      })
      .addMatcher(isAnyOf(login.rejected,signUp.rejected,facebookAuthenticate.rejected,googleAuthenticate.rejected),(state,action)=>{
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        state.status = "failed"   
        state.isAuthenticated = false
        state.access = null
        state.refresh = null
        state.user
        state.error = action.error.message
        state.user = null
      })
      .addMatcher(isAnyOf(login.pending,activate.pending,loadUser.pending,checkAuthentication.pending, passwordReset.pending, passwordResetConfirm.pending, facebookAuthenticate.pending, googleAuthenticate.pending), (state,action) => {
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