/* eslint-disable */
// EditProduct.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { editProduct } from "../../redux/productSlice";
import "./editproduct.css";

const EditProduct = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State to manage form fields
  const [editedProduct, setEditedProduct] = useState({
    product_name: product.product_name,
    price: parseFloat(product.price),
    description: product.description,
    stock_quantity: parseInt(product.stock_quantity),
    category: product.category,
    // Add other fields as needed
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Dispatch action to update the product
    if (!editedProduct) {
      setErrorMessage("Error updating product");
    }

    if (JSON.stringify(editedProduct) === JSON.stringify(product)) {
      setErrorMessage("No changes made to the product.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}products/${product.product_id}`, {},
        editedProduct,
        { withCredentials: true } // Include withCredentials option here
      );

      console.log(editedProduct);
      dispatch(editProduct(editedProduct));
      setSuccessMessage("Product has been Updated");
      onClose();
    } catch (err) {
      console.error("Error updating a product", err);
      setErrorMessage("Error updating a product. Please try again.");
      setSuccessMessage("");
    }
  };

  const isFormChanged = Object.keys(editedProduct).some(
    (key) => editedProduct[key] !== product[key]
  );

  if (!isFormChanged) {
    setErrorMessage("No changes made to the product.");
    setSuccessMessage("");
    return;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form className="edit-product-form" onSubmit={handleFormSubmit}>
        <input type="hidden" value={editedProduct.product_id} />
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="product_name"
            value={editedProduct.product_name}
            onChange={handleInputChange}
            required
            placeholder="Product name"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>

          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            required
            placeholder="Product description"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            required
            placeholder="Product price"
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="stock_quantity"
            value={editedProduct.stock_quantity}
            onChange={handleInputChange}
            required
            placeholder="Product quantity"
          />
        </div>
        <div className="form-group">
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Marmelade">Marmelade</option>
              <option value="Other">Other</option>
              <option value="Gourmet">Gourmet</option>
            </select>
          </div>

          <button type="submit" className="edit-product-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
