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
       
    }else{
        
       
    }
     const onLogout=()=>{
        console.log('onlogout')
        dispatch(logout())
        dispatch(reset())
     }
    return (
        <nav className="navbar navbar-expand-lg bg-body " >
                <div className="container-fluid" >
                    <Link className="navbar-brand text-dark" to="/">Barber <span className='navbar-brand' style={{"color":"red"}}>Shop</span></Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                 <Link className="nav-link text-dark" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link text-dark" to="/places-list">My Places List</Link>
                            </li>
                        </ul>
                    </div>
                    {user?(
                                <>
                                    <a className="nav-link text-dark font-weight-bold"  >{user.name}</a>
                                    <img className='profile-img' src={user.imageUrl?user.imageUrl:"https://img-c.udemycdn.com/user/200_H/anonymous_3.png"}/>
                                </>  
                            ):(
                                <>
                                <Link className="nav-link text-dark font-weight-bold"  to="/login">Sign in</Link>
                                <Link className="nav-link text-dark font-weight-bold"  to="/register">Sign up</Link>
                                </>
                                )}
                </div> 
            </nav>
       
    )
}
export default Header