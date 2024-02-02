import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Logout from '../Logout/Logout';
import './userprofile.css';
import OrdersDetailsModal from '../Modal/OrdersDetailsModal';
import { FaUser } from "react-icons/fa";

const UserProfile = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.value);
  const userOrders = useSelector((state) => state.user.orders);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);

  const deleteUser = async () => {
    // Implement delete user functionality
  };

  const openModal = (order) => {
    console.log(userData)
    setModal(order);
  };

  const closeModal = () => {
    setModal(null);
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-header">
        <div className="user-info">
          <h2>{userData && `${userData.user.name}`}</h2>
          <p>{userData && userData.user.email}</p>
        </div>
        <div className="user-avatar">
          <FaUser className="user_details-icon" />
        </div>
      </div>
      <div className="user-details">
        <h3>HELLO</h3>
        {userData && (
          <>
            <p> {`${userData.user.name} `}</p>
            <p>Email: {userData.user.email}</p>
            <p>Role: <b> {userData.user.role}</b></p>
          </>
        )}
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          {userOrders.map((order) => (
            <li key={order.order_id}>
              <span onClick={() => openModal(order)}>Order ID: {order.order_id},</span>  <span>Total: {order.total_price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-utilities">
        <div className='logout'>Logout:<Logout /></div>
        <div className='del-user'> <p onClick={deleteUser}>Delete User</p></div>
      </div>
      {modal && (
        <div className="overlay">
          <div className="product-details-modal">
            <OrdersDetailsModal order={modal} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
