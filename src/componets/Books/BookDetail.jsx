import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaBook, FaStar, FaRegStar, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
 

const BookDetail = ({ books }) => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const book = books.find(b => b.id == id);

  if (!book) return <p className="text-white">Book not found</p>;

  return (
  <div className="bg-gray-100 min-h-screen py-12 px-4">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Books
    </button>

    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Book Image Section */}
        <div className="lg:w-2/5 p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-md h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full max-w-md h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-2xl flex flex-col items-center justify-center text-gray-500">
              <FaBook className="text-8xl mb-6 opacity-50" />
              <span className="text-2xl font-bold">No Cover Available</span>
              <p className="text-sm mt-2">Coming Soon</p>
            </div>
          )}
        </div>

        {/* Book Details Section */}
        <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Title & Author */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-2">
              By <span className="font-semibold text-indigo-600">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(4.5) ? (
                    <FaStar key={i} />
                  ) : i < 4.5 ? (
                    <FaRegStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </div>
              <span className="text-gray-600">(4.5) • 324 reviews</span>
            </div>

            {/* Price */}
            <div className="my-8">
              <span className="text-4xl font-bold text-gray-900">$19.99</span>
              <span className="text-lg text-gray-500 line-through ml-4">$29.99</span>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                33% OFF
              </span>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4 text-gray-700 mb-8">
              <div>
                <strong>Publisher:</strong> {book.publisher}
              </div>
              <div>
                <strong>Pages:</strong> {book.pages}
              </div>
              <div>
                <strong>Language:</strong> {book.language}
              </div>
              <div>
                <strong>Format:</strong> Paperback • eBook
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="px-4 py-3 hover:bg-gray-100">-</button>
                <span className="px-6 py-3 font-medium">1</span>
                <button className="px-4 py-3 hover:bg-gray-100">+</button>
              </div>

              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105">
                Add to Cart
              </button>
            </div>

            {/* Buy Now & Wishlist */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition">
                Buy Now
              </button>

              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <FaRegHeart className="text-2xl text-gray-600 hover:text-red-500 transition" />
              </button>

              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <FaShareAlt className="text-2xl text-gray-600 hover:text-indigo-600 transition" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <svg className="w-10 h-10 mx-auto mb-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Payment
              </div>
              <div className="text-center text-sm text-gray-600">
                <svg className="w-10 h-10 mx-auto mb-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a5.998 5.998 0 0111.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                </svg>
                Free Shipping
              </div>
              <div className="text-center text-sm text-gray-600">
                <svg className="w-10 h-10 mx-auto mb-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 111.414-1.414L9 10.586l2.293-2.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                </svg>
                30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default BookDetail;
