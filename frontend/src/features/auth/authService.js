import axios from 'axios'

const API_URL='api/users'

//register user
const register =async (userData)=>{
    console.log('here1')
    const response=await axios.post(API_URL,userData)
    console.log('here2')
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    console.log('here')
    
    return response.data
}

//logout user
const logout= ()=>{
    localStorage.removeItem('user')
}

const authService={
    register,
    logout
}

export default authService