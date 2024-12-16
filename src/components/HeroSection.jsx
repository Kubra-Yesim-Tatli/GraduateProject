import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-white">
      
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm uppercase tracking-widest">Summer 2020</p>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 my-2">
          Part of the Neural Universe
        </h1>
        <p className="text-gray-500 text-base max-w-sm mx-auto">
          We know how large objects will act, but things on a small scale.
        </p>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
          BUY NOW
        </button>
        <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50">
          Learn More
        </button>
      </div>

      
      <div className="w-full max-w-sm mx-auto">
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
