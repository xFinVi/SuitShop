import {createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // this will be holding the product items that are added to the cart
    },
    reducers: {
      addToCart: (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.product_id === newItem.product_id);
  
        if (existingItemIndex !== -1) {
          // If the product is already in the cart, update the quantity
          state.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          // If the product is not in the cart, insert a new cart entry
          state.items.push(newItem);
        }
      },
          updateCartItemQuantity: (state, action) => {
            const {product_id, quantity} = action.payload;
            const itemToUpdate = state.items.find(item => item.product_id === product_id);

            if(itemToUpdate) {
              itemToUpdate.quantity = quantity;
            }
          },
          removeCartItem: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.product_id !== productId);
          },
          
          clearCart: (state) => {
            state.items = [];
          }
          
    }
});

export const selectCartItems = (state) => state.cart.items;

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

export const {addToCart,updateCartItemQuantity,removeCartItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;