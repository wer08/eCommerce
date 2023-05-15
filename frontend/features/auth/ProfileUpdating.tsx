import React, { useState } from 'react';
import { TProfile } from './types';
import { useAppSelector } from '../../hooks';
import { getUser } from './authSlice';

interface Props{
    setEditing: (bool:boolean) => void
}

const ProfileUpdating: React.FC<Props> = ({setEditing}) => {

    const user = useAppSelector(getUser);

    const [formData, setFormData] = useState<TProfile>({
        username: user?.username,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        password: user?.password
        });

    const {username,email,firstName,lastName,password} = formData;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <ul className="list-group list-group-flush flex-grow-1">
                <li className="list-group-item">
                    <input type='text' name='email' value={email} onChange={(e)=>handleChange(e)}></input>
                </li>
                <li className="list-group-item">
                    <input type='text' name='username' value={username} onChange={(e)=>handleChange(e)}></input>
                </li>
                <li className="list-group-item">
                    <input type='text' name='firstName' value={firstName} onChange={(e)=>handleChange(e)}></input>
                </li>
                <li className="list-group-item">
                    <input type='text' name='lastName' value={lastName} onChange={(e)=>handleChange(e)}></input>
                </li>
                <li className="list-group-item">
                    <input type='password' name='password' value={password} onChange={(e)=>handleChange(e)}></input>
                </li>
                <button type='button' className='btn btn-primary' onClick={()=>setEditing(false)}>Save edit</button>
            </ul>
            
        </div>
    );
};

export default ProfileUpdating;