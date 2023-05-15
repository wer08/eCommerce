import React from 'react';
import { useState, useEffect } from "react";
import { TProfile } from './types';
import { useAppSelector } from '../../hooks';
import { getUser } from './authSlice';

const Profile = () => {

    const [profile,setProfile] = useState<TProfile>({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const user = useAppSelector(getUser);

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
        <div className="card m-3">
        <div className="card-header">Profile Information</div>
        <div className="card-body d-flex flex-column">
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
                <input type="password" className="form-control" value={password} disabled />
            </li>
            </ul>
        </div>
        </div>
    );
    };

export default Profile;
