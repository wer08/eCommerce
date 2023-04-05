
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import Home from './containers/Home'
import Login from '../features/auth/Login'
import Activate from '../features/auth/Activate'
import ResetPassword from '../features/auth/ResetPassword'
import ResetPasswordConfirm from '../features/auth/ResetPasswordConfirm'
import Google from '../features/auth/Google'

import SignUp from '../features/auth/SignUp'
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
          <Route path='/activate/:key' element={<Activate />} />
          <Route path='/reset_password' element={<ResetPassword/>} />
          <Route path='/google' element={<Google />} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
