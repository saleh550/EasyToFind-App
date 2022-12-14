import {useAuthStatus} from '../Hooks/useAuthStatus'
import {Outlet,Navigate} from 'react-router-dom'
import Spinner from './Spinner'



function PrivateRouteAuth(){
const {loggedIn,checkingStatus}=useAuthStatus()
if(checkingStatus){
    return <Spinner/>
}
return loggedIn ? <Outlet/> : <Navigate to='/login' />
}
export default PrivateRouteAuth