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
        const state = values.get('state') ? values.get('state') : null;
        const code = values.get('code') ? values.get('code') : null

        if(state && code)
        {
            dispatch(googleAuthenticate({state,code}))
        }


    },[location])

    if(isAuthenticated){
        navigate('/')
    }
    else{
        navigate('/login')
    }

    return (
        <>
        </>
    )
}

 
export default Google;