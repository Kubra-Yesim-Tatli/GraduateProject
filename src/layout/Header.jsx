import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; 

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b">
      <div className="font-bold text-lg">Bandage</div>
      <nav>
        <ul className="flex space-x-4 text-sm">
          <li>
            <Link to="/">Home</Link> 
          </li>
          <li>
            <Link to="/product">Product</Link> 
          </li>
          <li>
            <Link to="/pricing">Pricing</Link> 
          </li>
          <li>
            <Link to="/contact">Contact</Link> 
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
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
