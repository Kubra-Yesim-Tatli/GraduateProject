import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center h-auto md:h-screen p-4 bg-white">
      {/* Metin Alanı */}
      <div className="text-center md:text-left md:pl-8 md:w-1/2 mb-6 md:mb-0">
        <p className="text-gray-400 text-sm uppercase tracking-widest">Summer 2020</p>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 my-2">
          Part of the Neural Universe
        </h1>
        <p className="text-gray-500 text-base max-w-sm md:max-w-none">
          We know how large objects will act, but things on a small scale.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            BUY NOW
          </button>
          <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 max-w-sm md:max-w-none mx-auto">
        <img
          src="img/img13.png" 
          alt="Winter Wrap"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
