import React from 'react';
import AllProducts from '../Components/ProducList/AllProducts';
import { Outlet } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <>
      <AllProducts />
      <Outlet /> {/* This is where nested routes will be rendered */}
    </>
  );
};

export default ProductsPage;
