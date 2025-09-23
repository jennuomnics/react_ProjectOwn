import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type homeSchema } from "../Pages/HomesList";
import axios from '../axios.ts'
import toast from "react-hot-toast";

export interface homesStructure {
    homes:homeSchema[],
    isLoading :boolean,
    error : string

}

const initialState : homesStructure ={
    homes : [],
    isLoading:false,
    error:''
}


export interface addHomeSchema {
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface updateHome {
    id:number,
    newHome:addHomeSchema
}


export const fetchData = createAsyncThunk(('homes/getHomes'),async() => {
    const response = await axios.get("/homes");
    return response.data
})


export const addHome = createAsyncThunk(
  "homes/addHomes",
  async (newHome: addHomeSchema) => {
    const response = await axios.post("/homes", newHome);
    toast.success("home added Successfully")
    return response.data;
  }
);
export const updateHome = createAsyncThunk(
  "homes/updateHomes",
  async ({id,newHome}:updateHome) => {
    const response = await axios.put(`/homes/${id}`, newHome);
    toast.success("home updated Successfully");
    return {data:response.data,id};
  }
);


export const deleteHome = createAsyncThunk('homes/deleteHomes',async(id:number)=> {
    const response = await axios.delete(`/homes/${id}`);
    toast.success("home deleted Successfully");
    return id;
})

const homesSlice = createSlice({
    name:'home',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
       builder.addCase(fetchData.pending,(state) => {
        state.isLoading = true
       })
       .addCase(fetchData.fulfilled,(state,actions) => {
        state.isLoading = false;
        state.homes = actions.payload
       }).addCase(fetchData.rejected,(state,action)=> {
        state.isLoading = false;
        state.error = action.error.message ||  'faild to fetch the Data'
       })
       builder.addCase(addHome.pending,(state) => {
        state.isLoading = true
       })
       .addCase(addHome.fulfilled,(state,actions) => {
        state.isLoading = false;
        state.homes.push(actions.payload)
       }).addCase(addHome.rejected,(state,action)=> {
        state.isLoading = false;
        state.error = action.error.message ||  'faild to add Data'
       })
       builder.addCase(updateHome.pending,(state) => {
        state.isLoading = true
       })
       .addCase(updateHome.fulfilled,(state,actions) => {
        state.isLoading = false;
        state.homes = state.homes.map((home) => {
            if(home.id === actions.payload.id) {
                return {
                  id:actions.payload.id,
                  ...actions.payload.data
                }
            }
            return home
        })
       }).addCase(updateHome.rejected,(state,action)=> {
        state.isLoading = false;
        state.error = action.error.message ||  'faild to add Data'
       })
      
          .addCase(deleteHome.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteHome.fulfilled, (state, actions) => {
            state.isLoading = false;
            
          })
          .addCase(deleteHome.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "faild to fetch the Data";
          });
    },
    
})


export default homesSlice.reducer;