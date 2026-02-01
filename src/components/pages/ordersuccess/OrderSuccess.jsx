// src/pages/OrderSuccess.jsx (ya jahan bhi pages rakhte ho)

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 sm:p-12 text-center border border-gray-100">
        {/* Success Icon */}
        <div className="mx-auto mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>

        {/* Thank You Message */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          Thank you for shopping with us! Your order has been received and is now being processed.
          <br />
          You'll receive a confirmation email/SMS shortly.
        </p>

        {/* Order Info Box */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10 border border-gray-200">
          <p className="text-gray-700 text-lg mb-3">
            <span className="font-semibold">Estimated Delivery:</span> 3-7 working days
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Track your order:</span> Check your dashboard or email
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/books")}
            className="flex-1 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
          >
            Continue Shopping
            <FaArrowRight className="text-lg" />
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg rounded-xl shadow transition-all transform hover:scale-[1.02] active:scale-100"
          >
            View My Orders
          </button>
        </div>

        {/* Support Message */}
        <p className="mt-10 text-gray-500 text-sm">
          Need help? Contact us at support@bookstore.com or call +91-XXXXXXXXXX
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;