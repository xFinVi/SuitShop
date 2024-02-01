import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/productSlice";
import Hero from "../Components/Hero/Hero";
import ProductHero from "../Components/Hero/Hero";
import ProductsToPush from "../Components/Header/ProductsToPush";

const LandingPage = () => {



  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products/`);
        const result = await response.json();
      
        dispatch(setProducts(result));
      } catch (err) {
        console.log(err);
      }
    };
   
    fetchProducts();
  }, [dispatch]);

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div>LandingPage</div>
      <Hero />
      <ProductsToPush />
      <ProductHero />
    </>
  );
};

export default LandingPage;
