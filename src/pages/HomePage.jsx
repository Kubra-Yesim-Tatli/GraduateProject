import React from "react";
import Slider from "../components/Slider";
import EditorsPickSection from "../components/EditorsPickSection";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider"; // Burada içeri aktarıyoruz

const HomePage = () => {
  return (
    <div>
      <Slider />
      <EditorsPickSection />
      <ProductCard />
      <ProductSlider /> {/* ProductSlider bileşenini buraya ekledik */}
    </div>
  );
};

export default HomePage;
