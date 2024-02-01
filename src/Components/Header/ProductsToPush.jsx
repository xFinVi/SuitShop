// components/ProductsToPush.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./productstopush.css";
import ProductDetailsModal from "../Modal/ProductDetailsModal";

const ProductsToPush = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.product.products.paginatedProducts
  );
  const [modal, setModal] = useState(null);

  const openModal = (product) => {
    setModal(product);
  };

  const closeModal = () => {
    setModal(null);
  };

  if (!products || products.length === 0) {
    return <div>Loading...</div>; // You can show a loading indicator or handle it as you prefer
  }

  return (
    <div className="products-to-push-container">
      <h2>Featured Products</h2>
      <div className="productsPush-list">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="productpush-card"
            onClick={() => openModal(product)}
          >
            <div>
              <Link
                key={product.product_id}
                to={`/products/${product.product_id}`}
              >
                <img src={product.image_url} alt={product.name} />
              </Link>
            </div>
            <div className="product_infos">
              <span>{product.product_name}</span>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="overlay">
          <div className="product-details-modal">
            <ProductDetailsModal product={modal} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsToPush;
