import React from 'react';

function Button({ title, className = "", onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center
        px-8 py-4 text-lg font-semibold
        rounded-xl border backdrop-blur-sm
        transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-blue-500/20

        ${active
          ? "bg-blue-600 text-white border-blue-500 shadow-2xl shadow-blue-500/40 scale-105"
          : "bg-slate-800/80 text-slate-100 border-slate-700/50 shadow-xl shadow-black/30 hover:bg-slate-700/90 hover:border-blue-500/50 hover:shadow-blue-500/20"
        }

        ${className}
      `}
    >
      <span className="relative z-10 text-xl md:text-sm">{title}</span>

      {/* Shine line (sirf active/hover pe visible) */}
      <div
        className={`
          absolute inset-0 rounded-xl bg-gradient-to-r
          from-transparent via-white/30 to-transparent
          transition-opacity duration-300 -skew-x-12
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      />
    </button>
  );
}

export default Button;
