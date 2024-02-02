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

import {  useSelector } from "react-redux";


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

  return (
    
      <RouterProvider Provider router={router}>

      </RouterProvider>
   
  );
}

export default App;
