import React, { useEffect, useState } from 'react';
import { ROLE, User } from '../auth/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../auth/authSlice';
import { updateUser } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';

interface Props {
  setEditing: (bool: boolean) => void;
}

const ProfileUpdating: React.FC<Props> = ({ setEditing }) => {
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    id: 1,
    username: "",
    email: "",
    firstName: "", 
    lastName: "",
    password: "",
    role: ROLE.USER,     
    enabled: true,
    accountNonExpired: true,
    credentialsNonExpired: true,
    accountNonLocked: true,
    items: []

  });

  useEffect(()=>{
    if(user){
        setFormData({
            id:user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            role: user.role,
            enabled: user.enabled,
            accountNonExpired: user.accountNonExpired,
            credentialsNonExpired: user.credentialsNonExpired,
            accountNonLocked: user.accountNonLocked,
            items: user.items
        
          });
    }

  },[user])

  const { username, email, firstName, lastName, password } = formData;

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    setEditing(false);
    await dispatch(updateUser(formData));
    navigate('/login');
    dispatch(logout())
  }

  return (
    <div>
      <ul className="list-group list-group-flush flex-grow-1">
        <li className="list-group-item">
          <label htmlFor="inputEmailProfile">Email</label>
          <input
            id="inputEmailProfile"
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
        </li>
        <li className="list-group-item">
          <label htmlFor="inputUsernameProfile">Username</label>
          <input
            id="inputUsernameProfile"
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={handleChange}
            placeholder="Username"
          />
        </li>
        <li className="list-group-item">
          <label htmlFor="inputFirstNameProfile">First Name</label>
          <input
            id="inputFirstNameProfile"
            type="text"
            name="firstName"
            className="form-control"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </li>
        <li className="list-group-item">
          <label htmlFor="inputLastNameProfile">Last Name</label>
          <input
            id="inputLastNameProfile"
            type="text"
            name="lastName"
            className="form-control"
            value={lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </li>
        <li className="list-group-item">
          <label htmlFor="inputPasswordProfile">Password</label>
          <input
            id="inputPasswordProfile"
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </li>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleClick()}
        >
          Save edit
        </button>
      </ul>
    </div>
  );
};

export default ProfileUpdating;
