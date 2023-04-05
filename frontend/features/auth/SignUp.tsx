import React, { useState } from "react";
import {useAppDispatch,useAppSelector} from '../../hooks'
import { TSignUpFormData } from "./types";
import{Link, useNavigate} from 'react-router-dom';
import { getIsAuthenticated } from "./authSlice";
import { signUp } from "./authSlice";
import axios from "axios";
import GoogleButton from "react-google-button";
import { config } from "@fortawesome/fontawesome-svg-core";

const SignUp = () => {
    const [formData,setFormData] = useState<TSignUpFormData>({
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });
    const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const {username,email,password,rePassword} = formData;

    if(isAuthenticated){
        navigate('/')
    }
    if (requestSent){
        navigate('/login')
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password===rePassword){
            dispatch(signUp({
                username: username,
                email: email,
                password: password,
            }))
        }
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;
        setFormData({...formData, [field]: e.target.value})
    }

    const continueWithGoogle = async () => {

        const URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://localhost:5173/google&prompt=consent&response_type=token&client_id=726797131514-gpuj32fjc3on3l0man3krslmp967nldq.apps.googleusercontent.com&scope=openid%20email%20profile`
        try{
            const res = await axios.get(URL)
            console.log(res)
            window.location.replace(res.data.authorization_url)
        }catch(e){
            console.log(e)
        }
    }

    const continueWithFacebook = async () => {
        try{
            const res = await axios.get(`http://localhost:8000/accounts/facebook/login/callback/`)
            // window.location.replace(res.data.authorization_url)
        }catch(e){
            console.log(e)
        }
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
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Confirm Password" value={rePassword} name='password' pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={e=>onChange(e)} required/>
                </div>
                <button className="btn btn-primary" type='submit'>Sign Up</button>
                </form>

                <div>
                    <form action='https://accounts.google.com/o/oauth2/v2/auth'>
                    <input type="hidden" name="client_id" value="726797131514-gpuj32fjc3on3l0man3krslmp967nldq.apps.googleusercontent.com" />
                    <input type="hidden" name="prompt" value="consent" />
                    <input type="hidden" name="response_type" value="code" />
                    <input type="hidden" name="redirect_uri" value="http://localhost:5173/google" />
                    <input type="hidden" name="scope" value="openid email profile" />
                    <button className="btn btn-danger mt-3" type="submit">
                            Continue with google
                    </button>

                </form>
                </div>
                <p className="mt-3">
                    Already an user ? <Link to='/login'>Sign In</Link>
                </p>
           
        </div>
     );
}
 
export default SignUp;
