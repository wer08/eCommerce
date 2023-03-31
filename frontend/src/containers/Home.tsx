import { Link, useAsyncError } from 'react-router-dom'
import '../App.css'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { getUser } from '../../features/auth/authSlice'



const Home = () => {
  const user = useAppSelector(getUser)

  return (
    <div className="App">
      <Link className='btn btn-primary' to = "/login">
        Login
      </Link>
    </div>
  )
}
 
export default Home;