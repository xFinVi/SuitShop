import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import axios from 'axios';
import Logout from '../Logout/Logout'
import './userprofile.css'
import OrdersDetailsModal from '../Modal/OrdersDetailsModal';

import { FaUser } from "react-icons/fa";
const UserProfile = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user?.value?.user?.user_id);
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(() => {
   const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}users/${userId}`, {withCredentials: true}, {});
        setUserData(response.data);
        dispatch(setUser(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }; 

     const fetchUserOrders = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}orders`, {withCredentials: true}, {});
=======
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}orders`, {withCredentials: true});
>>>>>>> 5b5225197786e6dbc29406af60f8e9c7ea524cc0
        setUserOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setLoading(false);
      }
    }; 
  
    if (isAuthenticated) {
      fetchUserData();
      fetchUserOrders();
    }    

  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

   if (loading) {
    return <div>Loading...</div>;
   } 
const deleteUser = async () => {
  
};
const openModal = (order) => {
  setModal(order);
};

const closeModal = () => {
  setModal(null);
};


  return (
    <div className="user-profile">
    <div className="user-header">
      <div className="user-info">
        <h2>{userData && `${userData[0].first_name} ${userData[0].last_name}`}</h2>
        <p>{userData && userData[0].email}</p>
      </div>
      <div className="user-avatar">
      <FaUser className="user_details-icon"/>
      </div>
    </div>
    <div className="user-details">
      <h3>User Details</h3>
      {userData && (
        <>
          <p>Name: {`${userData[0].first_name} ${userData[0].last_name}`}</p>
          <p>Email: {userData[0].email}</p>
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
