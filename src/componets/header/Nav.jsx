import React from 'react';
import { NavLink } from 'react-router-dom';
import Humberg from './Humberg';

function Nav() {
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
        <div className="hidden sm:flex items-center space-x-2">
          <NavLink className={navLinkClass} to="/">Home</NavLink>
          <NavLink className={navLinkClass} to="/about">About</NavLink>
          <NavLink className={navLinkClass} to="/stores">Stores</NavLink>
          <NavLink className={navLinkClass} to="/books">Books</NavLink>
        </div>

        {/* Desktop CTA + Mobile Hamburger - Right */}
        <div className="flex items-center gap-4">
          {/* Desktop Join Button */}
          <NavLink
            to="/join"
            className="hidden sm:inline-flex items-center justify-center px-7 py-3 
                       bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                       text-white font-semibold text-base rounded-full
                       shadow-lg shadow-purple-600/40
                       hover:shadow-2xl hover:shadow-pink-600/50
                       hover:scale-105
                       transition-all duration-400
                       relative overflow-hidden group"
          >
            <span className="relative z-10">Join Now</span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </NavLink>

          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden">
            <Humberg className="text-white" />
          </div>
        </div>

      </div>

      {/* Optional: Subtle bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </nav>
  );
}

export default Nav;