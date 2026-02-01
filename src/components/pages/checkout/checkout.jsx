import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCheckout } from "../../../App/slices/checkoutSlice";
import { placeOrder } from "../../../App/slices/orderSlice"; // ← Make sure path is correct

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Checkout slice data
  const { items, source } = useSelector((state) => state.checkout);

  // Order slice data (loading, error, success)
  const { loading, error, success } = useSelector((state) => state.order);

  // If no items → show empty state
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">No items to checkout</h2>
          <button
            onClick={() => navigate("/books")}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  // Handle Place Order
  const handlePlaceOrder = () => {
    dispatch(
      placeOrder({
        items,
        source,
        total,
      })
    );
  };

  // Redirect on success + clear checkout
  useEffect(() => {
    if (success) {
      dispatch(clearCheckout());
      navigate("/order-success");
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.$id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-2xl shadow-md border border-gray-100"
              >
                <div className="space-y-2">
                  <h2 className="font-semibold text-xl text-gray-900">{item.title}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                  <p className="text-gray-500">
                    Price per item: ₹{(item.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
                <span className="font-bold text-xl text-emerald-600 mt-4 sm:mt-0">
                  ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 h-fit lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full mt-8 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all
                ${loading
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-100"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                  </svg>
                  Placing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>

            {error && (
              <p className="text-red-600 text-center mt-4 font-medium text-lg">
                {error}
              </p>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              Source: {source === "buyNow" ? "Buy Now" : "Cart"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;