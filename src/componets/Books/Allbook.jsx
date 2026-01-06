import React from "react";
import booksdata from "./booksdata";
import Section from "./Section";

function Allbook() {
  const sectionsConfig = [
    { title: "Business Books", type: "genre", value: "Business" },
    { title: "Islamic Literature", type: "genre", value: "Islamic" },
    { title: "Popular & Trending", type: "category", value: "Popular" },
    { title: "Recommended for You", type: "category", value: "Recommended" },
    { title: "Psychology", type: "genre", value: "phsychology" }, // Note: fix typo in data later → "Psychology"
  ];

  const getBooks = (type, value, limit = 6) => {
    return booksdata
      .filter(book => book[type] === value)
      .slice(0, limit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 py-12 md:py-20">
      {/* Optional Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Explore Our Collection
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Dive into worlds of knowledge, inspiration, and imagination. Curated just for you.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-28">
        {sectionsConfig.map((section, index) => (
          <div
            key={section.title}
            
          >
            <Section
              title={section.title}
              books={getBooks(section.type, section.value)}
            />
          </div>
        ))}
      </div>

      {/* Optional Closing CTA */}
      <div className="mt-24 text-center">
        <p className="text-gray-400 text-lg mb-6">Can't find what you're looking for?</p>
        <button className="
          px-10 py-4 
          bg-gradient-to-r from-purple-600 to-pink-600 
          text-white font-semibold text-lg rounded-full 
          shadow-2xl shadow-purple-600/50 
          hover:shadow-pink-600/60 
          hover:scale-105 
          transition-all duration-500
        ">
          Browse All Books
        </button>
      </div>
    </div>
  );
}

export default Allbook;   