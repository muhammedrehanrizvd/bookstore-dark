import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, fetchBooksByGenre } from '../../../App/slices/BookSlice';
import Section from "./Section";

function Allbook() {
  const dispatch = useDispatch();
  const { 
    genres, 
    genresLoading, 
    genreLoading, 
    error, 
    booksByGenre 
  } = useSelector((state) => state.book);

  // ✅ Step 1: Fetch genres
  useEffect(() => {
     console.log("🔥 fetchBooksByGenre dispatching");
    dispatch(fetchAllBooks());
  }, [dispatch]);

  // ✅ Step 2: Fetch books for each genre (only if not loaded)
  useEffect(() => {
    if (genres.length > 0) {
      genres.forEach((genre) => {
        if (!booksByGenre[genre]) {  // ✅ FIXED: Prevent infinite loop
          dispatch(fetchBooksByGenre({ genre}));
          console.log(
  "booksByGenre for", 
  genre, 
  booksByGenre[genre]
);

        }
      });
    }
  }, [genres, dispatch, booksByGenre]);

  // ========================================
  // LOADING STATE
  // ========================================
  if (genresLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading genres...</p>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-400 mb-4">⚠️ Error</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchAllBooks())}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // EMPTY STATE
  // ========================================
  if (genres.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400">No books available yet</p>
          <p className="text-gray-500 mt-4">Check back soon!</p>
        </div>
      </div>
    );
  }

  // ========================================
  // MAIN RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 py-12 md:py-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Explore Our Collection
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Dive into worlds of knowledge, inspiration, and imagination. Curated just for you.
        </p>
        <p className="text-sm text-purple-400 mt-4">
          {genres.length} genres available
        </p>
      </div>

      {/* Individual Genre Loading Indicators */}
      {genres.some(genre => genreLoading[genre]) && (
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm text-purple-300 animate-pulse">
            Loading books...
          </p>
        </div>
      )}

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-28">
        {genres.map((genre) => (
          <Section
            key={genre}
            title={genre}
            books={booksByGenre[genre] || []}
            loading={genreLoading[genre]}
          />
        ))}
      </div>

      {/* Closing CTA */}
      <div className="mt-24 text-center">
        <p className="text-gray-400 text-lg mb-6">
          Can't find what you're looking for?
        </p>
      </div>
    </div>
  );
}

export default Allbook;