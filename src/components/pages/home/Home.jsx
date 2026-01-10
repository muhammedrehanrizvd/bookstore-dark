import React from 'react';
import Top from './Top';
import Middle from './Middle';
import useLatestBook from "../../customhook/useLatestBook";

import Bookcard from './Bookcard';

function Home() {
  const { data, loading, error } = useLatestBook();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black">
        <p className="text-2xl text-gray-400 animate-pulse">Loading latest books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black">
        <p className="text-2xl text-red-400">Error loading books. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Top />
      <Middle />

      {/* Latest Books Section - Premium Carousel */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-indigo-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="
              text-4xl md:text-6xl font-bold 
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent
              drop-shadow-2xl
            ">
              Latest Arrivals
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Fresh titles handpicked just for you
            </p>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="
            relative
            overflow-x-auto
            scrollbar-hide
            scroll-smooth
            snap-x snap-mandatory
            -mx-6 px-6
            pb-8
          ">
            <div className="
              flex gap-8 md:gap-12
              items-center
            ">
              {data.map((book, index) => (
                <div
                  key={index}
                  className="
                    flex-shrink-0
                    w-72 md:w-80 lg:w-96
                    snap-center
                    first:ml-0
                  "
                >
                  <Bookcard Book={book} />
                </div>
              ))}
            </div>

            {/* Optional: Fade edges for premium feel */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent" />
          </div>

          {/* Scroll Hint on Mobile */}
          <div className="text-center mt-8 md:hidden">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
              </svg>
              Swipe to see more
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;