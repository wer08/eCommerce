import { useEffect, useState } from "react"; // Importing useState hook from react
import { Link, Navigate, useLocation } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import { getIsAuthenticated,  googleAuthenticate} from "./authSlice"; // Importing login action creator from authSlice
import { useAppDispatch, useAppSelector } from "../../hooks"; // Importing custom hooks
import React from "react";

const PasswordForGoogle = () => {
    // Using useState hook to create two state variables, formData and isAuthenticated
    const [formData, setFormData] = useState({
        password: "",
        rePassword: ""
    })
    const isAuthenticated = useAppSelector(getIsAuthenticated)

    const location = useLocation();
    const code:string = location.state.jwt;
    useEffect(()=>{
        // console.log(code)
    },[])

    

    // Using useAppDispatch hook to create a dispatch function
    const dispatch = useAppDispatch()

    // Destructuring formData into two variables, username and password
    const { password, rePassword } = formData

    // Creating onChange function to update formData state when user types into form input fields
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        if(!form.checkValidity()){
            e.stopPropagation()
        }

        form.classList.add('was-validated');
        const arg = {
            jwt: code,
            password: password
        }

        dispatch(googleAuthenticate(arg))

    }

    // Rendering the login form, along with links to signup and reset password pages
    return ( 
        <div className="container mt-5 form">
            <h1>Enter The password for your account</h1>
            <form onSubmit={e => onSubmit(e)} className="needs-validation" noValidate>

                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength={6} pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Confirm Password" name="rePassword" pattern={`^${password}$`} minLength={6} value={rePassword} onChange={e=>onChange(e)} required />
                </div>
                <div className="invalid-feedback">
                    Both passwords need to be the same
                </div>
                <button className="btn btn-primary" type='submit'>Login</button>
            </form>

        </div>
     );
};
 
export default PasswordForGoogle;
