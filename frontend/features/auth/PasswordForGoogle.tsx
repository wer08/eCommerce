import { useEffect, useState } from "react"; // Importing useState hook from react
import { Link, Navigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import { getIsAuthenticated, getUser, login} from "./authSlice"; // Importing login action creator from authSlice
import { useAppDispatch, useAppSelector } from "../../hooks"; // Importing custom hooks
import React from "react";

const Login = () => {
    // Using useState hook to create two state variables, formData and isAuthenticated
    const [formData, setFormData] = useState({
        password: "",
        rePassword: ""
    })
    const isAuthenticated = useAppSelector(getIsAuthenticated)

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
        if(!form.checkValidity()){
            e.preventDefault();
            e.stopPropagation()
        }

        form.classList.add('was-validated');

    }

    // Rendering the login form, along with links to signup and reset password pages
    return ( 
        <div className="container mt-5 form">
            <h1>Enter The password for your account</h1>
            <form onSubmit={e => onSubmit(e)} className="needs-validation">

                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength={6} pattern="(?=.*\d)(?=.*\w)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Confirm Password" name="password" pattern={`^${password}$`} minLength={6} value={rePassword} onChange={e=>onChange(e)} required />
                </div>
                <div className="invalid-feedback">
                    Both passwords need to be the same
                </div>
                <button className="btn btn-primary" type='submit'>Login</button>
            </form>
            <p className="mt-3">
                Don't have an account ? <Link to='/signup'>SignUp</Link>
            </p>
            <p className="mt-3">
                Forgot your password ? <Link to='/reset_password'>Reset Password</Link>
            </p>
        </div>
     );
};
 
export default Login;
