import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";
import axios from "axios";
import "./addproduct.css"; 

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file.name);
  };

  // to preview the image before uploading
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  
  const handleSubmitFile = (e) => {
    e.preventDefault();

    if(!selectedFile) return;
   uploadImageToServer(previewSource);
  };

  const uploadImageToServer = async (base64EncodedImageStr) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/products/imageUpload`,
        { image: base64EncodedImageStr },
        { withCredentials: true }
      );
      return response.data.imageUrl;
    } catch (err) {
      console.error("Image Upload Error:", err);
      return { error: "Error uploading image. Please try again." };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price || !stock || !category) {
      setErrorMessage("Error adding a product. Please fill in all fields");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");

    try {

      // Send a single request to add the product with the image URL
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}products/`,
        {
          product_name: productName,
          description: description,
          price: parseFloat(price),
          stock_quantity: parseInt(stock),
          category: category,
          image: previewSource, // Include the base64-encoded image in the request
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        addProduct({
          product: response.data.product,
        })
      );

      setSuccessMessage("Product added successfully!");
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
    } catch (error) {
      console.error("Error adding a product", error);
      setErrorMessage("Error adding a product. Please try again.");
      setSuccessMessage("");
    }
  };


  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add Product</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Product name"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>

          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Product description"
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Product price"
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="stock_quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder="Product quantity"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Marmelade">Marmelade</option>
            <option value="Other">Other</option>
            <option value="Gourmet">Gourmet</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            value={fileInputState}
            onChange={handleFileInputChange}
          />
         
        </div>
        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>
    <br />
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "200px" }} />
      )}
    </div>
  );
};

export default AddProduct;
