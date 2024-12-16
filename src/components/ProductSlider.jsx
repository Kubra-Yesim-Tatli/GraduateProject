import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductSlider = () => {
  return (
    <div
      className="flex justify-center items-center h-screen px-6 relative"
      style={{ backgroundColor: "#23856D" }}
    >
      <div className="w-full max-w-sm relative">
        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          
          <SwiperSlide>
            <div className="flex flex-col items-center text-center text-white">
              <p className="text-sm mb-2">SUMMER 2020</p>
              <h2 className="text-2xl font-bold mb-4">Vita Classic Product</h2>
              <p className="text-sm mb-6">
                We know how large objects will act, but things on a small scale.
              </p>
              <span className="text-lg font-bold mb-4">$16.48</span>
              <button className="bg-green-400 text-white px-6 py-2 rounded hover:bg-green-500 transition">
                ADD TO CART
              </button>
              <img
                src="img/img12.png"
                alt="product"
                className="mt-6"
              />
            </div>
          </SwiperSlide>
        </Swiper>

       
        <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer z-10">
          <ChevronLeft size={32} />
        </div>
        <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer z-10">
          <ChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
