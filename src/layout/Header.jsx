import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="relative flex flex-col items-center justify-between px-4 py-2 bg-white border-b md:flex-row md:items-center">
     
      <div className="text-lg font-bold text-left w-full md:w-auto">
        <span className="text-left block md:inline">Bandage</span>
      </div>

      
      <nav className="flex flex-col items-center mt-4 space-y-2 text-[#737373] md:space-x-6 md:space-y-0 md:mt-0 md:flex-row md:justify-center md:w-full">
        <a href="#" className="text-sm hover:underline">
          Home
        </a>
        <a href="#" className="text-sm hover:underline">
          Product
        </a>
        <a href="#" className="text-sm hover:underline">
          Pricing
        </a>
        <a href="#" className="text-sm hover:underline">
          Contact
        </a>
      </nav>

      
      <div className="absolute top-0 right-0 mt-4 mr-4 flex space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ShoppingCart size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <AlignJustify size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
