import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Humberg from './Humberg';
import { selectTotalQuantity } from '../../App/slices/CartSelectors';
import AuthButtons from '../form/AuthButtons';

function Nav() {
  // ✅ Get auth state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `relative px-5 py-3 text-gray-300 font-medium text-base 
     transition-all duration-400 ease-out
     hover:text-white 
     hover:scale-105
     hidden sm:block
     after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
     after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 
     after:transition-all after:duration-400 after:ease-out
     ${isActive 
       ? "text-white drop-shadow-[0_0_12px_rgba(147,51,234,0.6)] after:w-full" 
       : "hover:after:w-full"
     }`;

  const cartTotalQty = useSelector(selectTotalQuantity) || 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-full">

        {/* Logo - Left */}
        <NavLink to="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gray-100">Book</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                             drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500">
              Store
            </span>
            <span className="text-pink-400 text-3xl">.</span>
          </span>
        </NavLink>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center space-x-2">
          <NavLink className={navLinkClass} to="/">Home</NavLink>
          <NavLink className={navLinkClass} to="/about">About</NavLink>
          <NavLink className={navLinkClass} to="/stores">Stores</NavLink>
          <NavLink className={navLinkClass} to="/books">Books</NavLink>
          
          {/* ✅ NEW: Dashboard Link (only for logged-in users) */}
          {isAuthenticated && user && (
            <NavLink className={navLinkClass} to="/dashboard">
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right Side: Dashboard Icon + Cart + Auth Buttons */}
        <div className="flex items-center gap-3">
          
          
          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="hidden lg:flex relative items-center justify-center p-3 rounded-full 
                       bg-white/5 backdrop-blur-sm border border-white/10
                       hover:bg-white/10 hover:border-purple-500/50
                       hover:scale-110 transition-all duration-400 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300 group-hover:text-white transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 9h14l-4-9M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartTotalQty > 0 && (
              <span className="
                absolute -top-1 -right-1
                min-w-5 h-5 px-1.5
                bg-gradient-to-r from-pink-500 to-purple-600
                text-white text-xs font-bold
                rounded-full flex items-center justify-center
                shadow-lg shadow-purple-900/50
                animate-pulse
              ">
                {cartTotalQty}
              </span>
            )}
          </NavLink>

          {/* Auth Buttons (Login/Logout) */}
          <AuthButtons />

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Humberg className="text-white" />
          </div>
        </div>

      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </nav>
  );
}

export default Nav;