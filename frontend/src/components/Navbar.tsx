import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getIsAuthenticated, logout, loadUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ModalCart from '../../features/cart/ModalCart'
import { clearCart, getNumberOfItems } from "../../features/cart/cartSlice";
import { filterItems } from "../../features/items/itemsSlice";
const Navbar = () => {

    const [redirect, setRedirect] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [search, setSearch] = useState("");
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const dispatch = useAppDispatch()
    const size = useAppSelector(getNumberOfItems)

    useEffect(()=>{
        dispatch(loadUser())
    },[])

    const handleLogout = () => {
        setRedirect(true);
        dispatch(logout());
        dispatch(clearCart());
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
                <li className="nav_item">
                    <Link className="nav-link click" to="/addItem">Add</Link>
                </li>
                <li className="nav_item">
                    <Link className="nav-link click" to="/myItems">MyItems</Link>
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

    const onClick = () => {
        setModalIsOpen(true)
    }

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        dispatch(filterItems(e.currentTarget.value))
    }


    return ( 
        <>
            <nav className="navbar navbar-expand-lg navbar-dark p-2" style={{backgroundColor: '#cf9013'}}>
                <Link className="navbar-brand" to="/">eCommerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLink()}
                        <form className="input-group input-group-sm">
                            <span className="input-group-text" id="glass"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                            <input type="text" className="form-control-sm" placeholder="Search..." value={search} onChange={(e) => handleSearch(e)} aria-describedby="glass"></input>
                        </form>

                    </ul>
                    {isAuthenticated && 
                    <>
                    
                    <FontAwesomeIcon className="navbar-text me-2 ms-auto cart position-relative" icon={faCartShopping}  onClick={onClick} data-bs-toggle="modal" data-bs-target="#cartModal"/>
                    {size>0 &&
                        <span className="translate-middle badge rounded-pill bg-danger">
                            {size}
                        </span>
                    }
                    </> }
                </div>
            </nav>
            {modalIsOpen && <ModalCart />}
            {redirect ? afterLogout() : <></>}
        </>
     );
}

 
export default Navbar;