import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CartItemsSchema {
    id:string,
    title:string,
    location:string,
    price:number,
    description:string,
    imageUrl:string,
    quantity:number,
    totalPrice:number
}

interface CartSchema {
    cart:CartItemsSchema[],
    isLoading:boolean,
    cartError:string,
}

const initialState:CartSchema = {
    cart:[],
    isLoading:false,
    cartError:''
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItemsSchema>) => {
            const item = state.cart.find((item)=>item.id === action.payload.id)
            if(item) {
                item.quantity++;
                 item.totalPrice = item.price * item.quantity;

            }
            else {
                state.cart.push(action.payload);
            }
            
        },

        removeFromCart:(state,action:PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseQuantity:(state,action:PayloadAction<string>) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if(item) {
                item.quantity += 1;
                item.totalPrice = item.price * item.quantity;
            }
            
        },
        decreaseQuantity:(state,action:PayloadAction<string>) => {
             const item = state.cart.find((item) => item.id === action.payload);
             if(item) {
                item.quantity--;
                item.totalPrice = item.price * item.quantity;
                if(item.quantity === 0) {
                    cartSlice.caseReducers.removeFromCart(state,action)
                }
             }
        }

    }
})

export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity} = cartSlice.actions

export default cartSlice.reducer;

export const cartLength = (state:RootState) => {
    return state.cart.cart.reduce((curr,item) => curr + 1,0)
}

export const OriginalPrice = (state:RootState) => {
    return state.cart.cart.reduce((curr,item)=> curr + item.totalPrice,0)
}