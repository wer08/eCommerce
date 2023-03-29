import { useEffect, useState } from "react"; // Importing useState hook from react
import { Link, Navigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import { getIsAuthenticated, login} from "./authSlice"; // Importing login action creator from authSlice
import { useAppDispatch, useAppSelector } from "../../hooks"; // Importing custom hooks

const Login = () => {
    // Using useState hook to create two state variables, formData and isAuthenticated
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const isAuthenticated = useAppSelector(getIsAuthenticated)



    // Using useAppDispatch hook to create a dispatch function
    const dispatch = useAppDispatch()

    // Destructuring formData into two variables, username and password
    const { username, password } = formData

    // Creating onChange function to update formData state when user types into form input fields
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // Creating onSubmit function to dispatch the login action when user submits the form
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(login({username,password}));

    }

    // Checking if user is authenticated, if yes, navigating to home page using Navigate component
    if (isAuthenticated)
    {
        return <Navigate to='/'></Navigate>
    }

    // Rendering the login form, along with links to signup and reset password pages
    return ( 
        <div className="container mt-5">
            <h1>Sign In</h1>
            <p>Sign into you account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='text' placeholder="Username" name="username" value={username} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength={6} value={password} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary" type='submit'>Login</button>
            </form>
            {/* 
            <div>
                <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
                    Continue with Google
                </button>
            </div>
            <div>
                <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
                    Continue with Facebook
                </button>
            </div> 
            */}
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
