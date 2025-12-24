import React from 'react'
import { NavLink } from 'react-router-dom';
import Humberg from './Humberg';

function Nav() {
    const navLinkClass = ({ isActive }) =>
        `relative px-4 py-2 text-slate-300 font-medium text-sm
         transition-all duration-300 ease-in-out
         hover:text-slate-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
         hover:scale-105
         hidden sm:block
         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 after:ease-in-out
         ${isActive 
           ? "text-slate-100 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] after:w-full" 
           : ""
         }`;

    return (
        <nav className="flex justify-between items-center w-full h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 fixed top-0 z-[100] px-4 sm:px-8 shadow-lg shadow-black/20">
            {/* Logo */}
            <div className="flex-shrink-0">
                <span className="text-xl font-semibold tracking-wide select-none cursor-pointer group">
                    <span className="text-slate-200">Book</span>
                    <span className="text-blue-400 ml-1 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,1)] transition-shadow duration-300">
                        Store
                    </span>
                </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex items-center space-x-1">
                <NavLink className={navLinkClass} to="/">Home</NavLink>
                <NavLink className={navLinkClass} to="/about">About</NavLink>
                <NavLink className={navLinkClass} to="/stores">Stores</NavLink>
                <NavLink className={navLinkClass} to="/books">Books</NavLink>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden sm:flex items-center space-x-4">
                <NavLink 
                    to="/join" 
                    className="group relative inline-flex items-center justify-center px-6 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 text-sm font-semibold rounded-lg border border-slate-700/50 shadow-lg shadow-black/30 hover:bg-slate-700/90 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                    <span className="relative z-10">Join Now</span>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform-gpu" />
                </NavLink>
            </div>

            {/* Mobile Hamburger */}
            <div className="sm:hidden flex-shrink-0">
                <Humberg />
            </div>
        </nav>
    );
}

export default Nav