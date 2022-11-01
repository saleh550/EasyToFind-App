import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import placesService from './placesService'


const initialState={ 
    
    places:[],
    places2:[],
    place:{},
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}

//get places from mongo (database ) that added by business owner by text search
export const getExistPlaces=createAsyncThunk('exist/places',async(textSearch,thunkAPI)=>{
    try{
        return await placesService.getExistPlaces(textSearch)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//get places from google maps api by text search
export const getPlaces=createAsyncThunk('places/get',async(textSearch,thunkAPI)=>{
    
    try{
        return await placesService.getPlaces(textSearch)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

//set specific place in the state
export const setPlace=createAsyncThunk('place/set',async(place,thunkAPI)=>{
    try{
        return await placesService.setPlace(place)
        
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)
        ||error.message
        ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const placesSlice=createSlice({
    name:'places',
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
        .addCase(setPlace.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(setPlace.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.place=action.payload
        })
        .addCase(setPlace.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.place=null
            
        })
        .addCase(getExistPlaces.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getExistPlaces.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.places2=action.payload
        })
        .addCase(getExistPlaces.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.places=null
            
        })
    }

})

export const {reset}=placesSlice.actions
export default placesSlice.reducer