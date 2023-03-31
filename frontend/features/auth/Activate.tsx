import { useState } from "react";
import { activate } from "./authSlice";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { useAppDispatch } from "../../hooks";
const Activate = () => {
    const [activated, setActivated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const routeParams = useParams();


    const handleClick = () => {
        const key = routeParams.key;
        key && dispatch(activate({key}));
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