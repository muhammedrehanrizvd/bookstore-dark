import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../App/slices/CartSelectors';
import { createPortal } from "react-dom";


function Humberg({ className }) {
  const [open, setOpen] = useState(false);
  const cartTotalQty = useSelector(selectTotalQuantity) || 0;

  const navLinkClass = ({ isActive }) => `
    flex items-center gap-4 px-8 py-5 text-xl font-medium rounded-xl
    transition-all duration-300
    ${isActive 
      ? 'text-white bg-white/10 shadow-lg shadow-purple-900/30' 
      : 'text-gray-300 hover:text-white hover:bg-white/5'
    }
  `;

  return (
    <>
      {/* Hamburger Trigger */}
      <div className={`p-2 rounded-full  bg-white/5 backdrop-blur-sm border border-white/10 ${className}`}>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={28}
          color="#e2e8f0"
          rounded
        />
      </div>

      {/* Full-Screen Mobile Menu */}
      {open && createPortal(
        <div className="
          fixed inset-0 z-[999]
    bg-black 
          backdrop-blur-2xl
          flex flex-col
          animate-in slide-in-from-left duration-500
        ">
          {/* Top: Close Button + Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-2xl font-bold">
              <span className="text-gray-100">Book</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Store
              </span>
            </span>

            <Hamburger
              toggled={open}
              toggle={setOpen}
              size={32}
              color="#e2e8f0"
              rounded
            />
          </div>

          {/* Menu Links - Centered */}
          <nav className="flex-1 flex flex-col  justify-center items-start px-8 space-y-4">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </NavLink>

            <NavLink to="/stores" className={navLinkClass} onClick={() => setOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H2m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Stores
            </NavLink>

            <NavLink to="/books" className={navLinkClass} onClick={() => setOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Books
            </NavLink>

            <NavLink to="/join" className={navLinkClass} onClick={() => setOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Join Now
            </NavLink>

            {/* Cart Link with Badge */}
            <NavLink to="/cart" className={navLinkClass} onClick={() => setOpen(false)}>
              <div className="relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 9h14l-4-9M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartTotalQty > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-6 h-6 px-1.5
                    bg-gradient-to-r from-pink-500 to-purple-600
                    text-white text-xs font-bold
                    rounded-full flex items-center justify-center
                    shadow-lg animate-pulse
                  ">
                    {cartTotalQty}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </NavLink>
          </nav>

          {/* Bottom Accent */}
          <div className="p-8 text-center text-gray-500 text-sm">
            © 2026 BookStore. All rights reserved.
          </div>
        </div>,
         document.body
        
      )}
    </>
  );
}

export default Humberg;