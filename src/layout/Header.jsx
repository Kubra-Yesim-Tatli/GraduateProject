import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import { UserContext } from "./UserContext";
import CartDropdown from "../components/CartDropdown";

const Header = () => {
  const { user, logout } = useContext(UserContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-col items-center justify-between px-4 py-2 bg-white border-b md:flex-row">
      <div className="text-lg font-bold text-left w-full md:w-auto">
        <span className="text-left block md:inline">Bandage</span>
      </div>

      <nav className="flex flex-col items-center mt-4 space-y-2 text-[#737373] md:space-x-6 md:space-y-0 md:mt-0 md:flex-row">
        <Link to="/" className="text-sm hover:underline">Home</Link>
        <Link to="/shop" className="text-sm hover:underline">Shop</Link>
        <Link to="/about" className="text-sm hover:underline">About</Link>
        <Link to="/blog" className="text-sm hover:underline">Blog</Link>
        <Link to="/contact" className="text-sm hover:underline">Contact</Link>
        <Link to="/pages" className="text-sm hover:underline">Pages</Link>
      </nav>

      <div className="flex items-center justify-end w-full space-x-4 md:w-auto">
        {user ? (
          <div className="flex items-center space-x-4">
            <Gravatar email={user.email} className="rounded-full w-8 h-8 border border-gray-300" />
            <span className="text-sm font-medium">{user.name || "User"}</span>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Register
            </Link>
          </>
        )}

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search size={20} />
        </button>
        <CartDropdown />
        
        {/* Hamburger Menu */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AlignJustify size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg p-4 rounded-md md:hidden">
            <Link to="/" className="block text-sm py-2">Home</Link>
            <Link to="/shop" className="block text-sm py-2">Shop</Link>
            <Link to="/about" className="block text-sm py-2">About</Link>
            <Link to="/blog" className="block text-sm py-2">Blog</Link>
            <Link to="/contact" className="block text-sm py-2">Contact</Link>
            <Link to="/pages" className="block text-sm py-2">Pages</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
