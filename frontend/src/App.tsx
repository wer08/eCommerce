
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import Home from './containers/Home'
import Login from '../features/auth/Login'
import Activate from '../features/auth/Activate'
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
          <Route path='/activate/:uid/:token' element={<Activate />} />
          {/* <Route path='/reset_password' element={<ResetPassword />} /> */}
          {/* <Route exact path='/google' element={<Google />} />
          <Route exact path='/facebook' element={<Facebook />} /> */}
          {/* <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} /> */}
          {/* <Route exact path='/profile' element={<Profile />} /> */}
        </Routes>
      </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
