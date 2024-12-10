import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import React from "react";

const Header = () => {
  return (

    <header className="flex flex-col items-center justify-between px-4 py-2 bg-white border-b md:flex-row">
      {/* Logo Bölümü */}
      <div className="text-lg font-bold text-left w-full md:w-auto">
        <span className="text-left block md:inline">Bandage</span>
      </div>
      <div className="bg-red-500 text-white p-6">
      Eğer bu kırmızı arka planda görünüyorsa, Tailwind çalışıyor demektir.
    </div>
      

      {/* Menü Linkleri */}
      <nav className="flex flex-col items-center mt-4 space-y-2 text-[#737373] md:space-x-6 md:space-y-0 md:mt-0 md:flex-row">
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

      {/* Sağdaki İkonlar */}
      <div className="flex items-center justify-end w-full space-x-4 md:w-auto">
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
