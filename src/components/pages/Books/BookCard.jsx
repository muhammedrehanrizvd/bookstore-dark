import React from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../../../appwrite/storage";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const getCoverImageUrl = () => {
    if (book.coverImage) {
      return storageService.getFilePreview(book.coverImage);
    }
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='100%25' height='100%25' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,sans-serif' font-size='clamp(20,5vw,34)' font-weight='500' fill='%234b5563'%3ENo Cover%3C/text%3E%3C/svg%3E";
  };

  return (
    <div
      className="
        group relative flex flex-col overflow-hidden h-full
        rounded-2xl sm:rounded-3xl
        bg-gradient-to-br from-slate-950 via-slate-900 to-black
        border border-slate-700/40 shadow-xl shadow-black/40
        transition-all duration-400 ease-out
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/35
        focus-within:-translate-y-2 focus-within:shadow-purple-900/35
      "
    >
      {/* Cover + Badges – shorter image */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
        <img
          src={getCoverImageUrl()}
          alt={book.title || "Book cover"}
          className="
            absolute inset-0 h-full w-full object-cover
            transition-all duration-700 ease-out
            group-hover:scale-105 group-hover:brightness-95
          "
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

        {/* Compact badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10 flex flex-wrap gap-2 sm:gap-2.5 pointer-events-none">
          {book.genre && (
            <span
              className="
                shrink-0 backdrop-blur-xl bg-white/10 border border-white/15
                px-2.5 py-1 sm:px-3.5 sm:py-1.5
                text-[10px] sm:text-xs font-medium
                text-white rounded-full shadow-sm
              "
            >
              {book.genre}
            </span>
          )}

          {book.status && book.status !== "available" && (
            <span
              className={`
                shrink-0 backdrop-blur-xl border shadow-sm
                px-3 py-1 sm:px-4 sm:py-1.5
                text-[10px] sm:text-xs font-semibold tracking-wide
                rounded-full whitespace-nowrap
                ${
                  book.status.toLowerCase().includes("sold") || book.status.toLowerCase() === "sold out"
                    ? "bg-slate-700/90 text-slate-200 border-slate-600/50"
                    : book.status.toLowerCase().includes("reserved") || book.status.toLowerCase().includes("hold")
                    ? "bg-amber-700/90 text-white border-amber-500/40"
                    : "bg-red-700/90 text-white border-red-500/40"
                }
              `}
            >
              {book.status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Content – tighter spacing */}
      <div className="flex flex-col flex-grow p-3.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        <h3
          className="
            text-sm sm:text-base lg:text-lg font-semibold
            text-white group-hover:text-purple-300
            transition-colors duration-300 line-clamp-2 leading-snug
          "
        >
          {book.title}
        </h3>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="truncate">{book.author || "Unknown Author"}</span>
        </div>

        

        {/* Price + Button – compact */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-800/50">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5">Price</p>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-emerald-400 tracking-tight">
                ₹{book.price?.toLocaleString("en-IN") ?? "—"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/books/${book.$id}`)}
            disabled={book.status === "sold"}
            className={`
              relative w-full py-2.5 sm:py-3 px-4 sm:px-6
              rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium
              flex items-center justify-center gap-2
              shadow-lg transition-all duration-400
              focus:outline-none focus:ring-2 focus:ring-purple-500/40
              ${
                book.status === "sold"
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 text-white"
              }
            `}
          >
            {book.status === "sold" ? (
              "Sold"
            ) : (
              <>
                View
                <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}

            {book.status !== "sold" && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default BookCard;