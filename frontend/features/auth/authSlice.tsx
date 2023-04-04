import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'
import type { authState, TArgLogin, TArgActivate, TArgPassConfirm, TArgSignUp, TArgSocialAuthenticate, TSocialDetail, User} from './types'
axios.defaults.withCredentials = true;




// Define the initial state using that type
const initialState: authState = {
    access: localStorage.getItem('access'),
    isAuthenticated: false,
    status: 'idle',
    error: null,
    user: null
}

export const signUp = createAsyncThunk('auth/signUp', async(arg:TArgSignUp)=>{
  const {username,email,firstName,lastName,password1,password2} = arg;
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username,email,firstName,lastName,password1,password2}); 
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/registration/`,body,config)
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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/login/`,body,config);
    return response.data
  }catch(error: any){
    throw error.message;
  }
})

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  if (localStorage.getItem('access')){
    const token = localStorage.getItem('access')
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
          'Accept': 'application/json',
      }
  };
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dj-rest-auth/user/`,config)
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/token/verify/ `,body,config)
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


export const googleAuthenticate = createAsyncThunk('auth/googleAuthentication', async (arg:string)=>{
  const code = arg;
  if(code && !localStorage.getItem('access'))
  {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    const body = {
      code: code
    }
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/google/`,body,config)
      return res.data
    }catch(error:any){
      console.log(error)
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
  const {key} = arg
  const body = JSON.stringify({key});
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/registration/verify-email/`,body,config)
  }catch(error: any){
    throw error.message
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
    await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/password/reset/`,body, config);
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
      new_password1: newPassword,
      new_password2: reNewPassword
  })
  try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/dj-rest-auth/password/reset/confirm/ `,body,config)
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
      state.user = null
    }
  },
  extraReducers(builder){

    builder  

      .addCase(checkAuthentication.fulfilled, (state,action) => {
          state.status = 'succeeded'
          state.isAuthenticated = true
          state.access = localStorage.getItem('access')
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
      .addCase(loadUser.fulfilled, (state,action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loadUser.rejected, (state,action) => {
          localStorage.removeItem('access')
          state.status = 'failed'
          state.error = action.error.message
          state.access = null
          state.user = null
      })
    builder
      .addMatcher(isAnyOf(login.fulfilled,googleAuthenticate.fulfilled), (state,action) => {
        localStorage.setItem('access',action.payload.access_token);
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.access = action.payload.access_token
        state.user = action.payload.user
        state.error = null
      })
      .addMatcher(isAnyOf(activate.fulfilled, passwordReset.fulfilled, passwordResetConfirm.fulfilled), (state,action) => {
          state.status = 'succeeded'
      })
      .addMatcher(isAnyOf(activate.rejected,passwordReset.rejected, passwordResetConfirm.rejected), (state,action) => {
          state.status = 'failed'
          state.error = action.error.message
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
      .addMatcher(isAnyOf(login.pending,activate.pending,loadUser.pending, passwordReset.pending, passwordResetConfirm.pending, googleAuthenticate.pending, loadUser.pending), (state,action) => {
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