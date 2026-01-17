// src/components/auth/AuthCard.jsx
import React from 'react';

function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="
      max-w-md w-full
      bg-white/5 backdrop-blur-xl
      rounded-3xl border border-white/10
      shadow-2xl shadow-purple-900/30
      p-8 md:p-12 text-center
      transition-all duration-500
    ">
      <div className="mb-10">
        <h1 className="
          text-4xl md:text-5xl font-bold
          bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent drop-shadow-2xl
        ">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-300">{subtitle}</p>
      </div>

      {children}

      {footer && <div className="mt-8 text-sm text-gray-400">{footer}</div>}
    </div>
  );
}

export default AuthCard;