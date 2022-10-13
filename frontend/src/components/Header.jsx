import {Link,useNavigate} from 'react-router-dom'
import {  BsScissors  } from "react-icons/bs";
import {FaUser,FaSignInAlt} from 'react-icons/fa' 
import {useSelector,useDispatch} from 'react-redux'
import {logout,reset} from '../features/auth/authSlice'

function Header({isForm}){
    const navigate =useNavigate()
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    if(!user){
       
    }else{
        
       
    }
     const onLogout=(e)=>{
      e.preventDefault()
        console.log('onlogout')
        dispatch(logout())
        dispatch(reset())
     }
    return (
       
        <nav className="navbar navbar-expand-lg navbar-light  ">
            <Link className="navbar-brand text-light" to="/">EasyTo<span className='navbar-brand' style={{"color":"red"}}>Find</span></Link>

      <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <Link className="nav-link text-light" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link text-light" to="/places-list">My Places List</Link>
          </li>
         
        </ul>
       <div className="form-inline">
       {user?(
            <>
            <a onClick={onLogout} href="/" className="nav-link text-light font-weight-bold">Logout</a>
            <div>
            <img className='profile-img' src={user.imageUrl?user.imageUrl:"https://img-c.udemycdn.com/user/200_H/anonymous_3.png"}/>
            

            </div>
            </>  
            ):(
            <>
            <Link className="nav-link text-light font-weight-bold"  to="/login">Sign in</Link>
            <Link className="nav-link text-light font-weight-bold"  to="/register">Sign up</Link>
            </>
            )}

       </div>
      </div>
    </nav>
   
       
    )
}
export default Header