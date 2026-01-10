import React from "react";

function Bookcard({ Book, className = "" }) {
  // Fallback if no cover
  const coverUrl = Book.cover_i
    ? `https://covers.openlibrary.org/b/id/${Book.cover_i}-L.jpg`
    : "https://via.placeholder.com/300x450/1e293b/64748b?text=No+Cover";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-gray-900/90 via-slate-900 to-black/90
        border border-slate-700/40
        shadow-2xl shadow-black/60
        backdrop-blur-sm
        transition-all duration-700 ease-out
        hover:-translate-y-4
        hover:shadow-3xl hover:shadow-purple-900/40
        hover:border-purple-500/30
        ${className}
      `}
    >
      {/* Subtle animated shine on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/20 to-purple-500/10 -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1200" />
      </div>

      {/* Book Cover - Responsive Height */}
      <div className="relative px-6 pt-8 pb-4 flex justify-center">
        <div className="relative">
          <img
            src={coverUrl}
            alt={Book.title || "Book cover"}
            className="
              w-48 sm:w-56 md:w-64
              h-72 sm:h-80 md:h-96
              object-cover rounded-xl
              shadow-2xl shadow-black/70
              border border-slate-600/50
              transition-all duration-700
              group-hover:scale-110 group-hover:rotate-1
            "
            loading="lazy" // Performance boost
          />

          {/* Glossy reflection overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/30 pointer-events-none mix-blend-overlay" />
        </div>
      </div>

      {/* Book Details - Bottom Section */}
      <div className="px-6 pb-8 text-center space-y-4">
        {/* Title */}
        <h1 className="
          text-lg sm:text-xl md:text-2xl
          font-bold text-white
          line-clamp-2 leading-tight
          drop-shadow-lg
          group-hover:text-blue-300 transition-colors duration-500
        ">
          {Book.title || "Untitled Book"}
        </h1>

        {/* Author */}
        <h3 className="
          text-base sm:text-lg
          font-medium text-purple-300
          drop-shadow-md
        ">
          {Book.author_name ? Book.author_name.join(", ") : "Unknown Author"}
        </h3>

        {/* Publication Year */}
        <p className="text-sm sm:text-base text-gray-400">
          First Published:{" "}
          <span className="text-white font-semibold">
            {Book.first_publish_year || "N/A"}
          </span>
        </p>
      </div>

      {/* Bottom Glow Accent */}
      <div className="
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r from-transparent via-purple-500 to-transparent
        blur-md
        scale-x-0 group-hover:scale-x-100
        transition-transform duration-700 origin-center
      " />
    </div>
  );
}

export default Bookcard;