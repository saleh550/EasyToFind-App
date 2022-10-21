import React, { useEffect } from 'react';
import {ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import PlaceInformation from './pages/PlaceInformations';
import PrivateRoute from './components/PrivateRoute';
import { BsGoogle } from 'react-icons/bs';
import PrivateRouteAuth from './components/PrivateRouteAuth';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import BusinessOwnerLogin from './pages/BusinessOwnerLogin'
import NewPlace from './pages/NewPlace';

function App() {
   // eslint-disable-next-line
 
  
  return (
    <>
    <Router>
      <div >
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/place/info/:placeid' element={<PrivateRoute/>} >
            <Route path='/place/info/:placeid' element={<PlaceInformation/>} />
          </Route>
          <Route path='/profile' element={<PrivateRouteAuth/>}>
            <Route path='/profile' element={<Profile/>}></Route>
          </Route>
          <Route path='/changepassword' element={<PrivateRouteAuth/>}>
          <Route path='/changepassword' element={<ChangePassword/>}/>
          </Route>
          <Route path='/businessowner/login' element={<BusinessOwnerLogin/>}/>
          <Route path='/newplace' element={<NewPlace/>}/>
        </Routes>
      </div>

    </Router>
    <ToastContainer/> 
    </>
  );
}

export default App;
