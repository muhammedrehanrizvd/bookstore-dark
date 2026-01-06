import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const linkStyle = ({ isActive }) =>
    `text-slate-300 hover:text-sky-400 transition-all duration-300 
     hover:underline underline-offset-4 
     ${isActive 
       ? 'text-sky-400 font-medium drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] underline' 
       : 'drop-shadow-sm'
     }`;

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row lg:justify-between gap-12 md:gap-16">

        {/* Left: Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6 max-w-sm mx-auto lg:mx-0">
          <img
            src="/Logo.jpg"
            alt="BookStore Logo"
            className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 object-cover rounded-full border-4 border-sky-500/30 shadow-2xl shadow-sky-500/20"
          />
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            BookStore<span className="text-sky-400">.</span>
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            A modern online bookstore for readers, dreamers, and lifelong learners.
            <br />
            Discover your next great story.
          </p>
        </div>

        {/* Center: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full text-center sm:text-left">
          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <NavLink to="/github" className={linkStyle}>GitHub</NavLink>
            <NavLink to="/linkedin" className={linkStyle}>LinkedIn</NavLink>
            <a
              href="mailto:support@bookstore.com"
              className="text-slate-300 hover:text-sky-400 transition-all duration-300 hover:underline underline-offset-4"
            >
              support@bookstore.com
            </a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <NavLink to="/terms" className={linkStyle}>Terms & Conditions</NavLink>
            <NavLink to="/shipping" className={linkStyle}>Shipping Policy</NavLink>
            <NavLink to="/refund" className={linkStyle}>Refund Policy</NavLink>
            <NavLink to="/privacy" className={linkStyle}>Privacy Policy</NavLink>
          </div>
        </div>

        {/* Right: Newsletter */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 mx-auto lg:mx-0 w-full max-w-xs lg:max-w-full">
          <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
          <p className="text-slate-400 text-sm md:text-base">
            Get exclusive deals and new release alerts
          </p>
         <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
  <input
    type="email"
    placeholder="Your email"
    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-r-none sm:rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
  />
  <button className="mt-2 sm:mt-0 sm:px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium transition">
    Subscribe
  </button>
</div>

        </div>

      </div>

      {/* Subtle Divider */}
      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-sky-800/30 to-transparent opacity-50"></div>
    </footer>
  );
}

export default Footer;
