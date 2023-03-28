import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {

    const [redirect, setRedirect] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    const handleLogout = () => {
        setRedirect(true);
    };

    const guestLink = () => {
        return(
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
            </>
        )
    };
    const authLinks = () =>{
        return(
            <>
                <li className="nav-item">
                    <Link className="nav-link click" to="#!" onClick={()=>handleLogout()}>LogOut</Link>
                </li>
                <li className="nav_item">
                    <Link className="nav-link click" to="/profile">Profile</Link>
                </li>
            </>

        )

    };

    const afterLogout = () => {
        setRedirect(false)
        return(
            <Navigate to="/" />
        )

    }




    return ( 
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
                <Link className="navbar-brand" to="/">Communicator</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLink()}
                    </ul>
                </div>
            </nav>
            {redirect ? afterLogout() : <></>}
        </>
     );
}

 
export default Navbar;