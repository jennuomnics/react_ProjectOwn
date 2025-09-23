import { configureStore } from "@reduxjs/toolkit";

import homesSlice from './Slices/homeSlice'

import cartSlice from './Slices/cartSlice'

import plotSlice from './Slices/plotSlice'

import mapSlice from './Slices/mapStore'


const store = configureStore({
    reducer:{
      homes : homesSlice,
      cart:cartSlice,
      plots:plotSlice,
      maps:mapSlice
    }
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type Appstore = typeof store



export default store;