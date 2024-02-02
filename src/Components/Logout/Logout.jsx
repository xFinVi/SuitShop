import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, clearUser } from "../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
  
      // Make an API call to your backend to logout
<<<<<<< HEAD
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}users/logout`,{}, { withCredentials: true });
=======
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}users/logout`, {},{withCredentials:true});
>>>>>>> 5b5225197786e6dbc29406af60f8e9c7ea524cc0
  
      console.log('Logout response:', response);
  
      if (response.status === 200) {
        console.log('Logout successful:', response.data);
        dispatch(clearUser(response.data));
  
        // Redirect only after clearing user data successfully
        navigate('/');
      } else {
        setError("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Error during logout");
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  return (
    <div>
      {/* Logout button */}
      <CiLogout onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging Out..." : "Logout"}
      </CiLogout>

      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}

      {/* You can add a loading spinner or any other UI element here if needed */}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Logout;
