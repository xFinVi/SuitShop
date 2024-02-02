// ProductDetailsModal.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./productdetailsmodal.css";

const ProductDetailsModal = ({ product, onClose,onAddToCart  }) => {
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
    
           
              <button type="submit" onClick={() => onAddToCart(product)}>
                Add to cart
              </button>
          
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
