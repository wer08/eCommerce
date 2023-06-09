import React from 'react';
import { useState, useEffect } from "react";
import { TProfile } from '../auth/types';
import { useAppSelector } from '../../hooks';
import { getUser } from '../auth/authSlice';
import ProfileUpdating from './ProfileUpdating';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [profile,setProfile] = useState<TProfile>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });


    const [editing,setEditing] = useState(false);

    const user = useAppSelector(getUser);
    const navigate  = useNavigate();

    if(!user){
      navigate('/');
    }

    const {username,email,firstName,lastName,password} = profile;

    useEffect(()=>{
        setProfile({
            username: user?.username,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            password: user?.password
        })
    },[user])

    return (
        <div className="card text-center m-3 ">
        <div className="card-header">Profile Information</div>
        <div className="card-body">
            {editing ? <ProfileUpdating setEditing={setEditing}/> :
            <>
            <ul className="list-group list-group-flush flex-grow-1">
            <li className="list-group-item">
                <strong>Email:</strong> {email}
            </li>
            <li className="list-group-item">
                <strong>Username:</strong> {username}
            </li>
            <li className="list-group-item">
                <strong>First Name:</strong> {firstName}
            </li>
            <li className="list-group-item">
                <strong>Last Name:</strong> {lastName}
            </li>
            <li className="list-group-item">
                <strong>Password:</strong>
                <span className='password'></span>
            </li>
            <button type='button' className='btn btn-primary' onClick={()=>setEditing(true)}>Edit</button>
            </ul>
            </>
            }
        </div>
        </div>
    );
    };

export default Profile;
