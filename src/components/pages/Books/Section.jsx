import React from "react";
import BookCard from "./BookCard";

function Section({ title, books, loading, error }) {
  return (
    <section className="mb-16">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mb-6">
        {title}
      </h1>

      {/* ✅ Per-genre error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
          <p className="text-red-300">Failed to load {title} books: {error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-slate-400 text-center mt-20">
          No books found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3 md:gap-2 sm:gap-1.5 gap-1">
          {books.map((book) => (
            <BookCard key={book.$id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
 export default Section;