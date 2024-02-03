// ProductDetailsModal.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./productdetailsmodal.css";
import { useDispatch} from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import axios from 'axios';

const ProductDetailsModal = ({ product, onClose  }) => {

  const dispatch = useDispatch();


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
    <div className="product-details-modal">
      <div className="details">
       
        <h2>{product.product_name}</h2>
        <p>Price: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    product.price,
  )}</p>
        <Link
          to={`/products/${product.product_id}`}
          className="product-card-link"
          onClick={onClose}
        >
          View Details
        </Link>
    
           
              <button type="submit" onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
          
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
