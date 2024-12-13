import React from "react";
import Slider from "../components/Slider";
import EditorsPickSection from "../components/EditorsPickSection";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  return (
    <div>
       
      <Slider />
      <EditorsPickSection />
      <ProductCard/>
      
    </div>
  );
};
export default HomePage;