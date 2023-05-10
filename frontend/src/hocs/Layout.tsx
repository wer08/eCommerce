import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loadUser } from "../../features/auth/authSlice";
import { getUsers } from "../../features/users/usersSlice";
import { getUser } from "../../features/auth/authSlice";

interface Props{
    children: ReactNode
}

const Layout = ({children}:Props) => {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(loadUser())
        dispatch(getUsers())
    },[dispatch])

    return ( 
        <div>
            <Navbar />
            {children}
        </div>
     );
}
 
export default Layout;