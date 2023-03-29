import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../../hooks";
import { checkAuthentication } from "../../features/auth/authSlice";

interface Props{
    children: ReactNode
}

const Layout = ({children}:Props) => {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(checkAuthentication())
    },[])

    return ( 
        <div>
            <Navbar />
            {children}
        </div>
     );
}
 
export default Layout;