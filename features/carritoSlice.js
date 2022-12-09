import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productos: []
}

export const carritoSlice = createSlice({
    name : "carrito",
    initialState,
    reducers:{
        addToCarrito: (state, action) => {
            state.productos = [...state.productos, action.payload]
        },
        removeFromCarrito: (state, action) => {
            const index = state.productos.findIndex((item) => item.id == action.payload)
            let nuevoCarrito = [...state.productos];

            if(index >= 0){
                nuevoCarrito.slice(index, 1);
            }

            state.productos = nuevoCarrito;
        },
    }
})

export const {addToCarrito, removeFromCarrito} = carritoSlice.actions

export const selectProductosCarrito = (state) => state.carrito.productos;

export const selectProductoCarritoConId = (state, id) => {
    state.carrito.productos.filter((item) =>{
        item.id == id;
    })
}

export default carritoSlice.reducer;