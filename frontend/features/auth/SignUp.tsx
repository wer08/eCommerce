import React, { useState } from "react";
import {useAppDispatch,useAppSelector} from '../../hooks'
import { TSignUpFormData } from "./types";
import{Link, useNavigate} from 'react-router-dom';
import { getIsAuthenticated } from "./authSlice";
import { signUp } from "./authSlice";
import axios from "axios";
import GoogleButton from "react-google-button";

const SignUp = () => {
    const [formData,setFormData] = useState<TSignUpFormData>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        rePassword: ""
    });
    const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const {username,email,firstName,lastName,password,rePassword} = formData;

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
                firstName: firstName,
                lastName: lastName,
                password: password,
                rePassword: rePassword
            }))
        }
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;
        setFormData({...formData, [field]: e.target.value})
    }

    const continueWithGoogle = async () => {
        try{
            const res = await axios.get(`http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:5173/google`)
            window.location.replace(res.data.authorization_url)
        }catch(e){
            console.log(e)
        }
    }

    const continueWithFacebook = async () => {
        try{
            const res = await axios.get(`http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:5173/facebook`)
            window.location.replace(res.data.authorization_url)
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
                    <input type="text" className="form-control mb-2" placeholder="First Name" value={firstName} name='firstName' onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control mb-2" placeholder="Last Name" value={lastName} name='lastName' onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Password" value={password} name='password' pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mb-2" placeholder="Confirm Password" minLength={6} value={rePassword} name='rePassword' onChange={e=>onChange(e)} required/>
                </div>
                <button className="btn btn-primary" type='submit'>Sign Up</button>
                </form>
                <div>
                    <GoogleButton type='dark' className="btn btn-danger mt-3" onClick={continueWithGoogle} />
  
                </div>
                <div>
                    <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
                        Continue with Facebook
                    </button>
                </div>
                <p className="mt-3">
                    Already an user ? <Link to='/login'>Sign In</Link>
                </p>
           
        </div>
     );
}
 
export default SignUp;
