import { useState } from "react";
import { activate } from "./authSlice";
import { useParams, useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import React from "react";

const Activate = () => {
    const [activated, setActivated] = useState(false);
    const navigate = useNavigate();

    const routeParams = useParams();


    const handleClick = () => {
        const uid = routeParams.uid;
        const token = routeParams.token;
        uid && token && activate({uid,token});
        setActivated(true)

    }

    if(activated){
        navigate('/login')
    }

    return ( 
        <div className="container mt-5">
            <div 
                className="d-flex flex-column justify-content-center align-items-center "
                style={{marginTop: '200px'}}
            >
                <h1>Verify your account</h1>
                <button className="btn btn-primary" type="button" onClick={() => handleClick()} style={{marginTop: '50px'}}>Activate</button>
            </div>

        </div>
     );
}
 
export default Activate;