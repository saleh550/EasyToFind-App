import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'



const initialState={ 
    user:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}

//Register user 
export const register=createAsyncThunk(
    'auth/register',
     async(user,thunkAPI)=>{
       
        try {
            return await authService.register(user)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)


//logout user 
export const logout=createAsyncThunk('auth/logout',async()=>{
   return await authService.logout()
})

//login user
export const login=createAsyncThunk(
    'auth/login',
     async (user,thunkAPI)=>{
        try {
            return await authService.login(user)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)

//login user with google
export const loginWithGoogle=createAsyncThunk(
    'google/login',
     async (user,thunkAPI)=>{
        try {
            return await authService.loginWithGoogle(user)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//Update User
export const updateUser=createAsyncThunk('update/user',async(userData,thunkAPI)=>{
   
    

    try{
        return await authService.updateUser(userData)
    }
    catch(error){
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

//change password
export const changePassword=createAsyncThunk('change/password',async(data,thunkAPI)=>{
    try{
        return await authService.changePassword(data)
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
    }
    
})

//upload Image 
export const uploadImage=createAsyncThunk('upload/image',async(formdata,thunkAPI)=>{
    try {
        return await authService.uploadImage(formdata)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})



export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
                
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user=null
            })
            .addCase(login.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(loginWithGoogle.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(loginWithGoogle.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(loginWithGoogle.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(changePassword.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(changePassword.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                
            })
            .addCase(changePassword.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                
            })
            .addCase(uploadImage.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(uploadImage.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(uploadImage.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                
            })
            .addCase(updateUser.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(updateUser.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(updateUser.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            
            
    }


})
export const {reset}=authSlice.actions
export default authSlice.reducer