import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage";
import ProductsPage from "./Pages/ProductsPage";
import OrdersPage from "./Pages/OrdersPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import UserProfilePage from "./Pages/UserProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Footer from "./Components/Footer/Footer";
import AddProductPage from "./Pages/AddProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { setUser,setLoading,clearUser } from "./redux/userSlice";
import { useEffect } from "react";

const RootLayout = () => {
  const isAdmin = useSelector((state) => state.user && state.user.role === 'admin');
  return (
    <>
      <Navbar />
      <Outlet isAdmin={isAdmin} />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />,
        canActivate: ({ isAdmin }) => isAdmin,
      },
      {
        path: "products/addProduct",
        element: <AddProductPage />,
        canActivate: ({ isAdmin }) => isAdmin,
      },
      {
        path: "cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
  
      {
        path: "userprofile",
        element: <UserProfilePage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    const checkLoggedInUser = async () => {
      try{
        dispatch(setLoading(true)); 
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}users`, {withCredentials:true});
        console.log(response);
        if(response.status==200){
          dispatch(setUser(response.data));
        }else if(response.status==401){
          console.log("NO USER CURRETLY LOGGED IN");
        }else {
          console.log("PLEASE LOG IN")
        }
      }catch (err) {
        console.error('NO USER CURRENTLY LOGGED IN,Error checking user login status:', err); // Log the caught error
      } finally {
        dispatch(setLoading(false)); // Set loading state back to false after checking
      }
    };
    checkLoggedInUser();
  },[dispatch])
  return (
    
      <RouterProvider Provider router={router}>

      </RouterProvider>
   
  );
}

export default App;
