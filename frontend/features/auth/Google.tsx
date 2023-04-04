import Navbar from '../../src/components/Navbar';
import { useEffect } from 'react';
import { getIsAuthenticated, googleAuthenticate } from './authSlice';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from '../../hooks';

const Google = () => {

    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
    
    useEffect(()=>{
        
        console.log(code)

        if(code)
        {
            // dispatch(googleAuthenticate(code))
        }
        if(isAuthenticated){
            navigate('/')
        }
        else{
            navigate('/login')
        }


    },[location])



    return (
        <div>
            google
        </div>
    )
}

 
export default Google;