import React, { useState } from "react";
import {useAppDispatch,useAppSelector} from '../../hooks'
import { TSignUpFormData } from "./types";
import{useNavigate} from 'react-router-dom';
import { getIsAuthenticated } from "./authSlice";
import { signUp } from "./authSlice";

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
            </form>
        </div>
     );
}
 
export default SignUp;
