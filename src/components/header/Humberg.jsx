import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import { NavLink } from 'react-router-dom';
import { selectTotalQuantity } from '../../App/slices/CartSelectors';
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../App/slices/authSlice';

function Humberg({ className }) {
  const [open, setOpen] = useState(false);
  const cartTotalQty = useSelector(selectTotalQuantity) || 0;
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navLinkClass = ({ isActive }) => `
    group flex items-center gap-4 px-6 py-4 text-lg font-medium
    rounded-xl transition-all duration-300
    ${isActive
      ? 'bg-white/10 text-white shadow-lg shadow-purple-900/20'
      : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }
  `;

  const authButtonClass = `
    flex items-center justify-center gap-3 px-8 py-5 mt-8 mx-6
    text-lg font-semibold rounded-2xl
    transition-all duration-300 transform active:scale-95
    bg-gradient-to-r from-indigo-600 to-purple-600
    hover:from-indigo-500 hover:to-purple-500
    text-white shadow-lg shadow-purple-900/30
    border border-purple-500/30
  `;

  return (
    <>
      {/* Trigger */}
      <div className={`p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 ${className}`}>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={28}
          color="#e2e8f0"
          rounded
        />
      </div>

      {/* Menu */}
      {open && createPortal(
        <div className="
          fixed inset-0 z-[999]
          bg-gradient-to-b from-black via-black to-gray-950
          backdrop-blur-xl
          flex flex-col
          animate-in slide-in-from-left duration-500
        ">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="text-gray-100">Book</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Store
              </span>
            </div>
            <Hamburger
              toggled={open}
              toggle={setOpen}
              size={32}
              color="#cbd5e1"
              rounded
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col justify-center px-6 space-y-3">
            {/* Main Navigation Links */}
            {[
              { to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home" },
              { to: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "About" },
              { to: "/stores", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H2m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Stores" },
              { to: "/books", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Books" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </NavLink>
            ))}

            {/* ✅ NEW: Dashboard Link (Only for logged-in users) */}
            {isAuthenticated && user && (
              <NavLink 
                to="/dashboard" 
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
                Dashboard
              </NavLink>
            )}

            {/* Cart Link */}
            <NavLink to="/cart" className={navLinkClass} onClick={() => setOpen(false)}>
              <div className="relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 9h14l-4-9M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartTotalQty > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-6 h-6 px-1.5
                    bg-gradient-to-r from-pink-500 to-purple-600
                    text-white text-xs font-bold rounded-full
                    flex items-center justify-center shadow-md
                  ">
                    {cartTotalQty}
                  </span>
                )}
              </div>
              Cart
            </NavLink>
          </nav>

          {/* Auth Section */}
          <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-sm">
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* ✅ User Info Card */}
                <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <p className="text-sm text-gray-400 mb-1">Logged in as</p>
                  <p className="text-white font-semibold truncate">{user?.name || user?.email}</p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    setOpen(false);
                  }}
                  className={authButtonClass}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <NavLink
                  to="/login"
                  className={authButtonClass}
                  onClick={() => setOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="
                    flex items-center justify-center gap-3 px-8 py-5
                    text-lg font-medium rounded-2xl
                    transition-all duration-300
                    text-white/80 hover:text-white
                    border border-white/20 hover:border-white/40
                    bg-white/5 hover:bg-white/10
                  "
                  onClick={() => setOpen(false)}
                >
                  Create Account
                </NavLink>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 text-center text-gray-500 text-sm border-t border-white/10">
            © {new Date().getFullYear()} BookStore • All rights reserved
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Humberg;