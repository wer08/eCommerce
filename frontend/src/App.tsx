
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import Home from './containers/Home'
import Login from '../features/auth/Login'
import SignUp from '../features/auth/SignUp'
import PasswordForGoogle from '../features/auth/PasswordForGoogle'
import AddItem from '../features/items/AddItem'
import MyItems from '../features/items/MyItems'
import Profile from '../features/auth/Profile'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './hocs/Layout'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path ="/login" element ={<Login />} />
          <Route path ="/signup" element ={<SignUp />} />
          <Route path ="/passwordForGoogle" element ={<PasswordForGoogle />} />
          <Route path ="/profile" element = {< Profile />} />
          <Route path ="/addItem" element ={<AddItem />} />
          <Route path='/myItems' element = {<MyItems />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
