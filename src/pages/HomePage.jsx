import React from "react";
import Slider from "../components/Slider";
import EditorsPickSection from "../components/EditorsPickSection";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider"; 
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <EditorsPickSection />
      <ProductCard />
      <ProductSlider /> 
      <HeroSection/>
    </div>
  );
};

export default HomePage;
