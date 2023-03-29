import { Link } from 'react-router-dom'
import '../App.css'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { getIsAuthenticated, loadUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'


const Home = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  useEffect(()=> {
    dispatch(loadUser())
  },[])
  

  return (
    <div className="App">
      <Link className='btn btn-primary' to = "/login">
        Login
      </Link>
    </div>
  )
}
 
export default Home;