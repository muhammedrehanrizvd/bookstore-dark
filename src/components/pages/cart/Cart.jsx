import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../App/slices/CartSlice';
import CartItem from './CartItem';
import { selectTotalPrice, selectTotalQuantity } from '../../../App/slices/CartSelectors';
import { useNavigate } from 'react-router-dom';
import { setCheckoutItems } from '../../../App/slices/checkoutSlice';
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const totalQty = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-950 to-black flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6">Your Cart is Empty</h2>
          <p className="text-xl text-gray-500 mb-10">Add some wonderful books to continue!</p>
          <a href="/books" className="
            px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 
            text-white font-bold text-lg rounded-xl shadow-2xl 
            hover:scale-105 transition-all duration-500
          ">
            Browse Books
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto"> {/* ← This keeps everything centered & constrained */}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition text-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </button>

        {/* Title */}
        <h1 className="
          text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10 md:mb-16
          bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent
        ">
          Your Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Cart Items List – Takes full width on mobile, 2/3 on large */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="
                  w-full               /* ← Full width on all screens */
                  max-w-[100%]         /* ← Prevents overflow on very small phones */
                  mx-auto              /* ← Centers if needed */
                  sm:max-w-2xl         /* ← Slightly constrained on sm+ for better look */
                "
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar – Full width on mobile, sticky on large */}
          <div className="
            lg:col-span-1
            bg-white/5 backdrop-blur-xl rounded-2xl 
            border border-white/10 p-6 sm:p-8
            shadow-2xl shadow-purple-900/40
            h-fit lg:sticky lg:top-24
          ">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Order Summary</h2>

            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg mb-10">
              <div className="flex justify-between text-gray-300">
                <span>Total Items</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="h-px bg-white/10 my-6"></div>
              <div className="flex justify-between text-2xl font-bold text-white">
                <span>Grand Total</span>
                <span className="text-emerald-400">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                dispatch(setCheckoutItems({
                  items: cartItems.map(item => ({ ...item, quantity: item.qty || 1 })),
                  source: "cart"
                }));
                navigate("/checkout");
              }}
              className="
              w-full py-5 mb-4
              bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
              hover:from-purple-500 hover:via-pink-500 hover:to-blue-500
              text-white font-bold text-lg sm:text-xl rounded-xl
              shadow-2xl shadow-purple-600/50 hover:shadow-pink-600/60
              hover:scale-105 transition-all duration-500
              relative overflow-hidden group
            ">
              <span className="relative z-10">Proceed to Checkout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 text-red-400 hover:text-red-300 font-medium transition text-base sm:text-lg"
            >
              Clear Cart
            </button>

            <p className="text-center text-gray-500 text-xs sm:text-sm mt-8">
              Secure payment • Free shipping • 30-day returns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;