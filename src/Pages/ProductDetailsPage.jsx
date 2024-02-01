// ProductDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/productSlice';
import ProductDetails from '../Components/ProductDetail/ProductDetails';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Replace this with your actual API endpoint to fetch product details
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products/${productId}`);
        const productDetails = await response.json();

        dispatch(setSelectedProduct(productDetails));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [dispatch, productId]);

  if (!selectedProduct) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default ProductDetailsPage;
