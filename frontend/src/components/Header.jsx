import {Link,useNavigate} from 'react-router-dom'
import {  BsScissors  } from "react-icons/bs";
import {FaUser,FaSignInAlt} from 'react-icons/fa' 
import {useSelector,useDispatch} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'

function Header(){
    const navigate =useNavigate()
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    if(!user){
        console.log('is null')
    }else{
        
        console.log(user)
    }
     const onLogout=()=>{
        console.log('onlogout')
        dispatch(logout())
        dispatch(reset())
     }
    return (
        <header className="header">
             <div className='logo'>
                
                <Link  className='logo' to='/'>
                <BsScissors style={{"fontSize":"30px"}} /> 
                 <p className='par-logo-white'>Barber </p>
                 <p className='par-logo-red' >Shop</p>
                </Link>
            </div>
            {!user ? (
                <div className='signin-up-header'>
                
                <Link  to='/register' ><p className='register-p-header'> <FaUser/> הרשם  </p></Link>
                <Link  to='/login' ><p className='login-p-header'><FaSignInAlt/> התחבר    </p></Link>
               
            </div>
            ):(
                <div className='signin-up-header'>
                
               <label onClick={onLogout} to='/' ><p className='login-p-header'><FaSignInAlt/> התנתק    </p></label>
               
            </div> 
            )}
           
        </header>
    )
}
export default Header