// In Nav.jsx or a separate AuthButtons component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../App/slices/authSlice";
import { NavLink } from "react-router-dom";

function AuthButtons() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Loading state (modern skeleton look)
  if (loading) {
    return (
      <div className="hidden sm:flex items-center gap-3 px-4 py-2">
        <div className="w-20 h-8 bg-white/10 rounded-xl animate-pulse" />
      </div>
    );
  }

  // Logged in → Logout button
  if (isAuthenticated && user) {
    return (
      <button
        onClick={() => dispatch(logoutUser())}
        className="
          hidden lg:flex items-center justify-center
          px-6 py-2.5
          bg-gradient-to-r from-red-600/90 to-rose-600/90
          hover:from-red-500 hover:to-rose-500
          text-white font-medium text-sm rounded-xl
          shadow-lg shadow-red-900/30
          hover:shadow-red-800/50 hover:scale-105
          transition-all duration-300 border border-red-500/30
        "
      >
        Logout
      </button>
    );
  }

  // Not logged in → Show Login (or Sign Up if preferred)
  return (
    <NavLink
      to="/login"  // Change to "/signup" if you want Sign Up first
      className="
        hidden sm:flex items-center justify-center
        px-6 py-2.5
        bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
        hover:from-purple-500 hover:via-pink-500 hover:to-blue-500
        text-white font-medium text-sm rounded-xl
        shadow-lg shadow-purple-900/40
        hover:shadow-purple-800/60 hover:scale-105
        transition-all duration-400 relative overflow-hidden group
        border border-white/10
      "
    >
      <span className="relative z-10">Login</span>
      {/* Shimmer effect (premium touch) */}
      <div className="
        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
        -translate-x-full group-hover:translate-x-full transition-transform duration-1000
      " />
    </NavLink>
  );
}

export default AuthButtons;