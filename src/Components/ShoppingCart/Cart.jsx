import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  addToCart,
  selectCartSubtotal,
  removeCartItem,
  clearCart
} from "../../redux/cartSlice";

import axios from "axios";

import "./cart.css";

const Cart = () => {
  const [cartId, setCartId] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user.value?.user?.user_id);

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (!isAuthenticated) {
          // Redirect to login page if not authenticated
          navigate("/login");
          return;
        }
        
        if (isAuthenticated) {
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}cart/`,{}, { withCredentials: true });
         
    
          const { user_id, products } = response.data;
        
    
          setCartId(user_id);
          dispatch(clearCart());
          if (Array.isArray(products)) {
            products.forEach((product) => dispatch(addToCart(product)));
          }
        }
      } catch (err) {
        console.error("Error fetching cart data", err);
      }
    };
    fetchCartData();
  }, [dispatch, isAuthenticated, userId,navigate]);

  const handleSubmit = async () => {
    try {
      // Make a POST request to initiate the checkout process
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}cart/checkout`, null, { withCredentials: true });
  
      // Check the HTTP status code
      if (response.status === 200) {
        // Handle the success response (e.g., show a success message, redirect, etc.)
        console.log("Checkout successful!");
        const responseData = response.data;
        console.log("Response data:", responseData);
        dispatch(clearCart());
        setSuccessMessage("Checkout successful! Thank you for your order!");

      } else {
        // Handle non-success status codes (e.g., show an error message)
        console.error("Error during checkout. Status code:", response.status);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error during checkout:", error);
    }
  };
  

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Make a POST request to add/update the quantity of an item in the cart
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}cart/add`,
        {
          productId: productId,
          quantity: newQuantity,
        },
        { withCredentials: true }
      );

      //updating redux state
      dispatch(
        updateCartItemQuantity({ product_id: productId, quantity: newQuantity })
      );
    } catch (err) {
      console.log("Error adding quantity", err);
    }
  };

  const handleRemoveItem = async (productId) => {
    console.log(productId);
    try {
      // Make a DELETE request to remove an item from the cart
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}cart/remove/${productId}`, {
        withCredentials: true,
      });
      dispatch(removeCartItem(productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    
    <div className="cart-container">
       {successMessage && (
        <div style={{ color: 'green', margin: '10px', padding: '10px', border: '1px solid green' }}>
          {successMessage}
        </div>
      )}
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <h3>Your Cart</h3>
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="explore-products-link">
            Explore Products
          </Link>
        </div>
      ) : (
        <div>
          <h3>Your Cart</h3>
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <div className="item-info">
                  <p className="item-name">{item.product_name}</p>
                  <p className="item-price">${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    item.price,
  )}</p>

                  <div className="cart-utilities">
                    <div className="item-quantity">
                      <label htmlFor={`quantity-${item.product_id}`}>
                        Quantity:
                      </label>
                      <select
                        className="qty-input"
                        id={`quantity-${item.product_id}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.product_id, e.target.value)
                        }
                      >
                        {[...Array(10).keys()].map((value) => (
                          <option key={value} value={value + 1}>
                            {value + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="remove-item"
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      <span>X</span>
                    </div>
                  </div>
                </div>
            
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>
              Total Items: <span>{cartItems.length}</span>
            </p>
            <p>
              Subtotal: <span>${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    subtotal,
  )}</span>
            </p>
            {/* Add total price or other summary information */}
            <Link to="/checkout">
                <button>Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
