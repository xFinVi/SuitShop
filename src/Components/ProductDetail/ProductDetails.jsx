// ProductDetails.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./productdetails.css"; 
import { deleteProduct } from "../../redux/productSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import EditProduct from "../EditProduct/EditProduct";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditOpen, setEditOpen] = useState(false);

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const user = useSelector((state) => state.user?.value?.user);
  const isAdmin = user && (user.role === "admin" || user.user_id === "admin");
  if (!selectedProduct) {
    return <div>Loading...</div>; // Display a loading indicator while waiting for data
  }

  const { product_id, price, product_name, description,image_url, additionalDetail } =
    selectedProduct;

  const handleDelete = async () => {
    if (!product_id) {
      console.error("Product ID is undefined.");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}products/${product_id}`,
        {withCredentials: true}
      );
      dispatch(deleteProduct(product_id));
      window.alert("Successfully deleted");
      navigate("/products", { state: { deleteMsg: "Successfully deleted" } });
    } catch (err) {
      console.log(err);
    }
  };

  const openEditModal = () => {
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        {<img src={image_url} alt="" />}
      </div>
      <div className="product-info">
        <h2>{product_name}</h2>
        <p className="price">Price: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    price,
  )}</p>
        <p className="description">Description: {description}</p>
        <p className="additional-detail">
          Additional Detail: {additionalDetail}
        </p>
        <div className="btn-links">
          <button>

            <Link to="/">Home</Link>
          </button>
          
          
          {isAdmin && (
            <>
              <button onClick={handleDelete}>Delete</button>

              <button onClick={openEditModal}>Edit</button>
            </>
          )}
        </div>
        {isEditOpen && (
          <EditProduct product={selectedProduct} onClose={closeEditModal} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
