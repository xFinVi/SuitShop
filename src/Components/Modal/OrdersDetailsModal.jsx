import React from 'react';
import { Link } from 'react-router-dom';
import './orderdetails.css';

const OrdersDetailsModal = ({ order, onClose }) => {
   
  return (
    <div className="order-details-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{order.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p><strong>Price:</strong> ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(order.total_price)}</p>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Phone Number:</strong> {order.phone_number}</p>
          <p onClick={ () =>  console.log(order)}><strong>Email:</strong> {order.email}</p>
        </div>
       {/*  <div className="modal-footer">
         
          <button className="close-btn" onClick={onClose}>Close</button>
        </div> */}
      </div>
    </div>
  );
};

export default OrdersDetailsModal;
