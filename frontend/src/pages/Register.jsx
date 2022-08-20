import {FaUser} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {useState} from 'react'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'


function Register(){

    const {user,isError,isSuccess,isLoading,message}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:''
    })
    const {name ,email,password,password2,phoneNumber}=formData
    
    const onChange=(e)=>{
        setFormData((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }))
        

    }
    const onSubmit=(e)=>{
        e.preventDefault()
        if(password!==password2)
        {
            toast.error('Please add a same password')
            return
        }else {
            const userData={
                name,email,password,phoneNumber
            }
            dispatch(register(userData))
        }
        console.log('submited')
    }
    const googleSignin=()=>{
        console.log('google')
        
    }
    return (
        <>
        <div className='log-page'>
        

        <div className='form'>
            <form onSubmit={onSubmit}>
            <h1>  התחבר <FaUser/> </h1>
            <div className='form-group'>
                <p> : שם מלא </p>
                 <input
                    type='text'
                    placeholder='Full Name'
                    id='name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <div className='form-group'>
                <p> : שם משתמש </p>
                 <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
           
            
            <div className='form-group'>
                <p> : סיסמה </p>
                 <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <div className='form-group'>
                <p> : אמת סיסמה </p>
                 <input
                    type='password'
                    placeholder='Password'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <div className='form-group'>
                <p> : מספר נייד </p>
                 <input
                    type='text'
                    placeholder='Phone Number'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <button className='btn-login' type='submit'>התחבר</button>
            <p className='p-icon'>התחבר עם </p>
           
            <FcGoogle onClick={googleSignin} className='google-icon'/>
            
            </form>
            </div>


        </div>
            
        
        </>
    )
}
export default Register