import { Link } from 'react-router-dom'
import '../App.css'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { decrement, increment } from '../../features/counter/counterSlice'

const Home = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(increment())
  }

  return (
    <div className="App">
      <Link className='btn btn-primary' to = "/login">
        Login
      </Link>
    </div>
  )
}
 
export default Home;