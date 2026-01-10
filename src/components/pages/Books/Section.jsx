import React from "react";
import BookCard from "./BookCard";

function Section({ title, books }) {
  return (
    <section className="mb-16">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mb-6">
        {title}
      </h1>

      {books.length === 0 ? (
        <p className="text-slate-400 text-center mt-20">
          No books found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Section;
