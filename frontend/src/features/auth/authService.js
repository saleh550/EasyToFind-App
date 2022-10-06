import axios from 'axios'


const API_URL='/api/users'

//register user
const register =async (userData)=>{
    const response=await axios.post(API_URL,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}


//login user
const login =async (userData)=>{
    
    const response=await axios.post(API_URL+'/login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    
    
    return response.data
}

//login user with google
const loginWithGoogle =async (userData)=>{
    
    const response=await axios.post(API_URL+'/google',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    
    
    return response.data
}


//logout user
const logout= ()=>{
    localStorage.removeItem('user')
}

//update user
const updateUser=async(userData)=>{
    const response=await axios.put(API_URL+`/update/${userData.id}`,userData)
    return response.data

}
//change Password
const changePassword=async(data)=>{
    const response= await axios.put(API_URL+`/update/password/${data.id}`,data)
    return response.data
}
//upload image 
const uploadImage=async(formdata)=>{
    const id=formdata.get("id")
    const response=await axios.post(API_URL+`/upload/image/${id}`,formdata)
    return response.data
    

}

const authService={
    register,
    logout,
    loginWithGoogle,
    updateUser,
    changePassword,
    login,
    uploadImage
}

export default authService