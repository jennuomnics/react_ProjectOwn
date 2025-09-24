import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../axios'
import toast from "react-hot-toast";

export interface plotSchema {
  id?: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  areaSqFt: number;
  plotType: string;
  facingDirection: string;
  roadWidth: string;
  availability: string;
  nearbyAmenities:string[]
}

export interface plotStructure {
    plots: plotSchema[],
    isLoading:boolean,
    error:string
}

const initialState:plotStructure = {
    plots:[],
    isLoading:false,
    error:''
}


export const getPlots = createAsyncThunk('plots/getPlots',async() => {
    const response =await api.get('/plots');
    return response.data
})

export const deletePlots = createAsyncThunk('plots/deletePlot',async(id:string | undefined)=> {
    const response = await api.delete(`/plots/${id}`)
     toast.success("plot has deleted Successfully");
    return id;
})


export const updatePlots = createAsyncThunk('plots/updatePlot',async(updatedPlot:plotSchema) => {
  const response = await api.put(`/plots/${updatedPlot.id}`,updatedPlot);
   toast.success("plot has updated Successfully");
  return response.data;
})


export const addPlot = createAsyncThunk('plots/addPlot',async(newPlot:plotSchema)=> {
    const response = await api.post('/plots',newPlot)
    toast.success('plot has Added Successfully')
    return response.data
})

const plotSlice = createSlice({
    initialState,
    name:'plot',
    reducers:{

    },
    extraReducers:(builder) => {
        builder
          .addCase(getPlots.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getPlots.fulfilled, (state, action) => {
            state.isLoading = false;
            state.plots = action.payload;
          })
          .addCase(getPlots.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "failed to Fetch";
          })
          .addCase(updatePlots.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updatePlots.fulfilled, (state) => {
            state.isLoading = false;
          })
          .addCase(updatePlots.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "failed to Fetch";
          })
          .addCase(deletePlots.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deletePlots.fulfilled, (state) => {
            state.isLoading = false;
          })
          .addCase(deletePlots.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "failed to Fetch";
          });
    }
})

export default plotSlice.reducer;