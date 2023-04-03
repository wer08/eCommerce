import { Link, useAsyncError } from 'react-router-dom'
import '../App.css'

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