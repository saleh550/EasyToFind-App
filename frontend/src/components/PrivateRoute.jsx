import {Navigate, navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Spinner from './Spinner'

function PrivateRoute(){
    const {place , isLoading} =useSelector(state=>state.places)
    if(isLoading){
        return <Spinner/>
    }
    return (Object.keys(place).length===0 ? <Navigate to='/'/> : <Outlet/>)
    
}
export default PrivateRoute