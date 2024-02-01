// productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {},
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      const productData = action.payload.product;
      state.products[productData.product_id] = productData;
      state.selectedProduct = null;
    },
    editProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.products[updatedProduct.product_id] = updatedProduct;
      state.selectedProduct = updatedProduct; // Update th
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      delete state.products[productId];
      state.selectedProduct = null;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  deleteProduct,
  setAllProducts,
  editProduct,
  addImageData,
} = productSlice.actions;

export default productSlice.reducer;
