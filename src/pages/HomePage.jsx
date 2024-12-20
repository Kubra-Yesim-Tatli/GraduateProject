import React from "react";
import Slider from "../components/Slider";
import EditorsPickSection from "../components/EditorsPickSection";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider"; 
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <EditorsPickSection />
      <ProductCard />
      <ProductSlider /> 
      <HeroSection/>
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
