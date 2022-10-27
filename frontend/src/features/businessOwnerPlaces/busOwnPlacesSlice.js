import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import busOwnPlacesService from './busOwnPlacesService'


const initialState={ 
    
    places:[],
    place:{},
    googlePlace:{},
    imagesUrl:[],
    isSuccess:false,
    isError:false,
    isLoading:false,
    isExist:false,
    message:''
}


//get places from google maps api by text search
export const getPlaces=createAsyncThunk('busOwnPlaces/get',async(textSearch,thunkAPI)=>{
    
    try{
        return await busOwnPlacesService.getPlaces(textSearch)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})
//check places is exist in the database
export const checkPlaceExist=createAsyncThunk('check/place',async(googleId,thunkAPI)=>{
    

    try{
        return await busOwnPlacesService.checkPlaceExist(googleId)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//clear state of places
export const clear=createAsyncThunk('clear/places',async()=>{
    return await busOwnPlacesService.clear()
})

//set google place in the state 
export const  setGooglePlace=createAsyncThunk('set/googlePlace',async (googlePlace)=>{
return await busOwnPlacesService.setGooglePlace(googlePlace)
})

//creat place by business owner
export const createPlace=createAsyncThunk('create/place',async(formData,thunkAPI)=>{
   
    try{
        return await busOwnPlacesService.createPlace(formData)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//upload images to s3 and return ther url
export const uploadImages=createAsyncThunk('upload/images',async(formdata,thunkAPI)=>{
    try{
        return await busOwnPlacesService.uploadImages(formdata)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const busOwnPlacesSlice=createSlice({
    name:'busOwnPlaces',
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
        .addCase(getPlaces.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPlaces.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.places=action.payload
        })
        .addCase(getPlaces.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.places=null
            
        })
        .addCase(checkPlaceExist.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(checkPlaceExist.fulfilled,(state,action)=>{
            
            const response=action.payload
            if(!response.isExist){
                state.place={}
            }else
            state.place=response.place
            state.isExist=response.isExist
            state.isLoading=false
        })
        
        .addCase(checkPlaceExist.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(clear.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(clear.fulfilled,(state)=>{
            state.places=[]
            state.googlePlace={}
            state.isLoading=false
            
        })
        .addCase(clear.rejected,(state,action)=>{
            state.message=action.payload
            state.isLoading=false
        })
        .addCase(setGooglePlace.fulfilled,(state,action)=>{
            state.googlePlace=action.payload
        })
        .addCase(createPlace.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createPlace.fulfilled,(state,action)=>{
            state.place=action.payload 
            state.isLoading=false
            state.isSuccess=true
        })
        .addCase(createPlace.rejected,(state,action)=>{
            state.place={}
            state.isError=true
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(uploadImages.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(uploadImages.fulfilled,(state,action)=>{
            state.isLoading=false
            state.imagesUrl=action.payload
        })
        .addCase(uploadImages.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
            state.places=null
            
        })
        
        
       
    }

})

export const {reset}=busOwnPlacesSlice.actions
export default busOwnPlacesSlice.reducer