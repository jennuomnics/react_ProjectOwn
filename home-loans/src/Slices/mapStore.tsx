import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface mapStructure {
    lat:number,
    lng:number,
    location:string
}

const initialState: mapStructure = {
  lat: 20.5937,
  lng: 78.9629,
  location: "",
};

interface latlng {
    lat:number,
    lng:number
}

export const getLocationDetails = createAsyncThunk(('map/location'),async(latlng:latlng) => {
     const url = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`;

     const response = await fetch(url, {
       headers: {
         "User-Agent": "my-map-app",
       },
     });

     const data = await response.json();
     return data.display_name;
})

const mapSlice = createSlice({
    name:'map',
    initialState,
    reducers: {
        addLatLng:(state:mapStructure,action:PayloadAction<latlng>) => {
            state.lat = action.payload.lat
            state.lng = action.payload.lng
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getLocationDetails.fulfilled,(state,action) => {
            state.location = action.payload
        })
    }
})


export const  {addLatLng} = mapSlice.actions

export default mapSlice.reducer;