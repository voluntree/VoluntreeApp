import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./features/carritoSlice"
export const store = configureStore({
    reducer:{
        carrito: carritoReducer,
    },
})