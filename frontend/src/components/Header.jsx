import {Link} from 'react-router-dom'
import {  BsScissors  } from "react-icons/bs";

import {FaUser,FaSignInAlt} from 'react-icons/fa' 

function Header(){
    return (
        <header className="header">
             <div className='logo'>
                
                <Link  className='logo' to='/'>
                <BsScissors style={{"fontSize":"30px"}} /> 
                 <p className='par-logo-white'>Barber </p>
                 <p className='par-logo-red' >Shop</p>
                </Link>
            </div>
            <div className='signin-up-header'>
                
                <Link  to='/register' ><p className='register-p-header'> <FaUser/> הרשם  </p></Link>
                <Link  to='/login' ><p className='login-p-header'><FaSignInAlt/> התחבר    </p></Link>
               
            </div>
        </header>
    )
}
export default Header