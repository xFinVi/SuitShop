/* eslint-disable no-unused-vars */
// AllProducts.jsx
import React, { useState, useEffect } from "react";
import "./allproducts.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedProduct } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";
import axios from "axios";

import ProductDetailsModal from "../Modal/ProductDetailsModal";

const AllProducts = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products`);
        const result = await response.json();
        dispatch(setProducts(result.paginatedProducts));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const openModal = (product) => {
    setModal(product);
  };

  const closeModal = () => {
    setModal(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = async (product) => {
    const defaultQuantity = 1;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}cart/add`,
        {
          productId: product.product_id,
          quantity: defaultQuantity,
          name: product.product_name,
          price: product.price,
        },
        { withCredentials: true }
      );

      const { cartProductId, message } = response.data;

      const productObject = {
        product_id: product.product_id,
        quantity: defaultQuantity,
        name: product.product_name,
        price: product.price,
        cart_product_id: cartProductId,
      };

      dispatch(addToCart(productObject));
      console.log(message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-list">
        {currentProducts?.map((product) => (
          <div key={product.product_id} className="product-card">
             <div className="product-images"  onClick={() => openModal(product)}>
              <img src={product.image_url} alt="" />
            </div>
            <div className="product-information">
            <h3>{product.product_name}</h3>
      
            <p>${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    product.price,
  )}</p>
            </div>           
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => {
          const startPage = Math.max(1, currentPage - 1);
          const endPage = Math.min(
            currentPage + 1,
            Math.ceil(products.length / productsPerPage)
          );

          if (index + 1 >= startPage && index + 1 <= endPage) {
            return (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={index + 1 === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            );
          }

          return null;
        })}
      </div>

      {modal && (
        <div className="overlay">
          <div className="product-details-modal">
            <ProductDetailsModal product={modal} onClose={closeModal}  />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;

