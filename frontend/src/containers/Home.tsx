import { Link } from 'react-router-dom'
import '../App.css'

import { useAppSelector, useAppDispatch } from '../../hooks'


const Home = () => {


  return (
    <div className="App">
      <Link className='btn btn-primary' to = "/login">
        Login
      </Link>
    </div>
  )
}
 
export default Home;