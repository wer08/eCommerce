import React, { useEffect, useRef, useState } from "react";
import {useAppDispatch,useAppSelector} from '../../hooks'
import { TSignUpFormData } from "./types";
import{Link, useNavigate} from 'react-router-dom';
import { getIsAuthenticated } from "./authSlice";
import { signUp, googleAuthenticate } from "./authSlice";
import { selectUsers } from "../users/usersSlice";

declare global {
    interface Window {
      auth: (res: any) => void;
    }
  }

const SignUp = () => {
    const [formData,setFormData] = useState<TSignUpFormData>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });
    const emailInput = useRef(null);
    const usernameInput = useRef(null);

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const users = useAppSelector(selectUsers)
    const {firstName,lastName,username,email,password,rePassword} = formData;


    if(isAuthenticated){
        navigate('/')
    }


    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = e.currentTarget
        if(form.checkValidity()){
 
            if(password != rePassword){
                return
            }
            dispatch(signUp(formData)).then(()=>navigate('/login'))
        }
        else{
            console.log('valid')
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated')
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;
        if(field === 'username'){
            checkUsernameExistence(e.target.value);
        }
        if(field === 'email'){
            checkEmailExistence(e.target.value);
        }
        setFormData({...formData, [field]: e.target.value})
    }



    window.auth = (res:any) => {
        const jwt: string = res.credential
        navigate('/passwordForGoogle',{
            state: {
                jwt: jwt
            }
        })
        
    }



    const checkUsernameExistence = (username:string): void => {
        const usernames = users.map(user => user.username)
        if(usernameInput.current){
            const input = usernameInput.current as HTMLInputElement
            if(usernames.includes(username)){
                
                input.classList.add('is-invalid')
            }
            else{
                input.classList.remove('is-invalid')
                input.classList.add('is-valid')
            }

        }
    }

    const checkEmailExistence = (email:string): void  => {
        const emails = users.map(user => user.email)
        if(emailInput.current){
            const input = emailInput.current as HTMLInputElement
            if(emails.includes(email)){
                input.setCustomValidity("Email already in the database");
                input.classList.add('is-invalid')
            }
            else{
                input.setCustomValidity("");
                input.classList.remove('is-invalid')
                
            }

        }
    }

    return ( 
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Create new accoutn</p>

            <form onSubmit={e=>onSubmit(e)} className="needs-validation" noValidate>
                <div >
                    <input type="text" className="form-control mb-2" placeholder="First Name" value={firstName} name='firstName' onChange={e=>onChange(e)} required/>
                    <div className="invalid-feedback">
                        Please enter your valid first Name
                    </div>
                </div>
                <div >
                    <input type="text" className="form-control mb-2" placeholder="Last Name" value={lastName} name='lastName' onChange={e=>onChange(e)} required/>
                    <div className="invalid-feedback">
                        Please enter valid last Name
                    </div>
                </div>
                <div >
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Username" 
                        value={username} 
                        name='username' 
                        onChange={e=>onChange(e)} 
                        ref={usernameInput}
                        required/>
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                </div>
                <div >
                    <input 
                        type="email" 
                        className="form-control mb-2" 
                        placeholder="Email" 
                        value={email} 
                        name='email' 
                        onChange={e=>onChange(e)} 
                        ref={emailInput}
                        required/>

                    <div className="invalid-feedback">
                        Please choose an email.
                    </div>
                </div>
                <div >
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Password" value={password} name='password' pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={e=>onChange(e)} required/>
                    <div className="invalid-feedback">
                        Please provide a password. It needs to have at least 8 characters with one big letter one small letter a number and a special sign
                    </div>
                </div>
                <div >
                    <input type="password" className="form-control mb-2" minLength={6} placeholder="Confirm Password" value={rePassword} name='rePassword' pattern={`^${password}$`} onChange={e=>onChange(e)} required/>
                    <div className="invalid-feedback">
                        passwords must be the same
                    </div>               
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
