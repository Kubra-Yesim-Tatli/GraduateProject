import { AlignJustify, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Gravatar from "react-gravatar";
import CartDropdown from "../components/CartDropdown";
import { logout } from '../Redux/Action/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex flex-col items-center justify-between px-4 py-2 bg-white border-b md:flex-row">
      <div className="text-lg font-bold text-left w-full md:w-auto">
        <Link to="/" className="text-left block md:inline">Bandage</Link>
      </div>

      <nav className="flex flex-col items-center mt-4 space-y-2 text-[#737373] md:space-x-6 md:space-y-0 md:mt-0 md:flex-row">
        <Link to="/" className="text-sm hover:underline">Home</Link>
        <Link to="/shop" className="text-sm hover:underline">Shop</Link>
        <Link to="/about" className="text-sm hover:underline">About</Link>
        <Link to="/team" className="text-sm hover:underline">Team</Link>
        <Link to="/contact" className="text-sm hover:underline">Contact</Link>
      </nav>

      <div className="flex items-center justify-end w-full space-x-4 md:w-auto">
        {isAuthenticated ? (
          <div className="relative" ref={userMenuRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              {user?.email ? (
                <Gravatar email={user.email} className="rounded-full w-8 h-8 border border-gray-300" />
              ) : (
                <div className="w-8 h-8 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                  <User size={16} className="text-gray-500" />
                </div>
              )}
              <span className="text-sm font-medium">{user?.name || "Kullanıcı"}</span>
              <ChevronDown size={16} className={`transform transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/profile/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Siparişlerim
                </Link>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
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
        
        <button
          className="p-2 rounded-full hover:bg-gray-100 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AlignJustify size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg p-4 rounded-md md:hidden border border-gray-200">
            <Link to="/" className="block text-sm py-2">Home</Link>
            <Link to="/shop" className="block text-sm py-2">Shop</Link>
            <Link to="/about" className="block text-sm py-2">About</Link>
            <Link to="/team" className="block text-sm py-2">Team</Link>
            <Link to="/contact" className="block text-sm py-2">Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
