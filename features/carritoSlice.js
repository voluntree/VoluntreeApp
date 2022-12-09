import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const carritoSlice = createSlice({
    name : "carrito",
    initialState,
    reducers:{
        addToCarrito: (state = initialState, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromCarrito: (state, action) => {
            const index = state.items.findIndex((item) => item.id == action.payload)
            let nuevoCarrito = [...state.items];

            if(index >= 0){
                nuevoCarrito.slice(index, 1);
            }

            state.items = nuevoCarrito;
        },
    }
})

export const {addToCarrito, removeFromCarrito} = carritoSlice.actions

export const selectProductosCarrito = (state) => state.carrito.items

export const selectProductoCarritoConId = (state, id) => {
    state.carrito.items.filter((item) =>{
        item.id == id;
    })
}

export const selectTotalCarrito = (state) => state.carrito.items.reduce((total, item) => total += item.precio, 0)

export default carritoSlice.reducer;