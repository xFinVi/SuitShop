// Checkout.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import { selectCartItems, selectCartSubtotal } from '../../redux/cartSlice';
import axios from 'axios';
import './checkout.css'; // Import CSS file for styling

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
    });
    const [successMessage, setSuccessMessage ] = useState("");

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartSubtotal);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            // Make a POST request to submit user details and complete the order
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/cart/checkout`, formData, { withCredentials: true });
            if (response.status === 200) {
                console.log('Order placed successfully!');
                // Clear the cart after placing the order
                dispatch(clearCart());
                setSuccessMessage("Checkout successful! Thank you for your order!");
                // Redirect to a confirmation page or display a success message
            } else {
                console.error('Failed to place order');
                // Handle failure scenarios
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle network errors or other issues
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="checkout-container">

            {successMessage && (
                <h1 className='Success'>Successfuly Completed The order</h1>
            )}
            <h2>Checkout</h2>
            <div className="cart-items">
                <h3>Items in Cart</h3>
                {cartItems.map(item => (
                    <div key={item.product_id} className="cart-item">
                        <img src={item.image_url} alt="" />
                        <div className='items-in-cart'>
                        <p>{item.product_name} - ${Math.round(item.price).toLocaleString('en-GB')}</p>




                        <p>Quantity: {item.quantity}</p>
                        </div>
                       
                    </div>

                ))}
                 <p>Total: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    subTotal,
  )}</p>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
