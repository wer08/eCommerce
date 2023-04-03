import Navbar from '../../src/components/Navbar';
import { useEffect } from 'react';
import { getIsAuthenticated, googleAuthenticate } from './authSlice';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from '../../hooks';

const Google = () => {

    let location = useLocation();
    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    
    useEffect(()=>{
        const values = new URLSearchParams(location.search);
        const token = values.get('access_token') ? values.get('state') : null;


        if(token)
        {
            // dispatch(googleAuthenticate(token))
        }
        // if(isAuthenticated){
        //     navigate('/')
        // }
        // else{
        //     navigate('/login')
        // }


    },[location])



    return (
        <div>
            google
        </div>
    )
}

 
export default Google;