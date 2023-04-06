import React, { useEffect, useState } from "react";
import {useAppDispatch,useAppSelector} from '../../hooks'
import { TSignUpFormData } from "./types";
import{Link, useNavigate} from 'react-router-dom';
import { getIsAuthenticated } from "./authSlice";
import { signUp, googleAuthenticate } from "./authSlice";
import axios from "axios";

declare global {
    interface Window {
      auth: (res: any) => void;
    }
  }

const SignUp = () => {
    const [formData,setFormData] = useState<TSignUpFormData>({
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const {username,email,password,rePassword} = formData;


    if(isAuthenticated){
        navigate('/')
    }


    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password===rePassword){
            dispatch(signUp({
                username: username,
                email: email,
                password: password,
            })).then(()=>navigate('/login'))
        }
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;
        setFormData({...formData, [field]: e.target.value})
    }

    window.auth = (res:any) => {
        console.log(res)
        dispatch(googleAuthenticate(res.credential)).then(()=>navigate('/login'))
        
    }

    return ( 
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Create new accoutn</p>

            <form onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" className="form-control mb-2" placeholder="Username" value={username} name='username' onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control mb-2" placeholder="Email" value={email} name='email' onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Password" value={password} name='password' pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Confirm Password" value={rePassword} name='rePassword' pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={e=>onChange(e)} required/>
                </div>
                <button className="btn btn-primary" type='submit'>Sign Up</button>
                </form>
                <div id="g_id_onload"
                    data-client_id="726797131514-gpuj32fjc3on3l0man3krslmp967nldq.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-callback="auth"
                    data-auto_prompt="false">
                </div>

                <div className="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signup_with,"
                    data-size="large"
                    data-logo_alignment="left">
                </div>


                <p className="mt-3">
                    Already an user ? <Link to='/login'>Sign In</Link>
                </p>
           
        </div>
     );
}
 
export default SignUp;
