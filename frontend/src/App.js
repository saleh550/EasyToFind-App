import React, { useEffect } from 'react';
import {ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
// import { Counter } from './features/counter/Counter';
import Header from './components/Header';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import { BsGoogle } from 'react-icons/bs';

function App() {
   // eslint-disable-next-line
 
  
  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>

    </Router>
    <ToastContainer/> 
    </>
  );
}

export default App;
