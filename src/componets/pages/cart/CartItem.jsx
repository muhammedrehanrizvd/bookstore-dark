import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQty, decreaseQty } from '../../../App/slices/CartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="
      bg-white/5 backdrop-blur-xl rounded-2xl 
      border border-white/10 
      p-6 flex flex-row sm:flex-row gap-6
      shadow-2xl shadow-black/40
      hover:border-purple-500/30 hover:shadow-purple-900/30 
      transition-all duration-500
    ">
      {/* Book Image */}
      <img 
        src={item.image} 
        alt={item.title}
        className="w-32 sm:w-40 h-48 sm:h-56 object-cover rounded-xl shadow-lg flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
         
        </div>

        {/* Quantity & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(decreaseQty(item.id))}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600/50 text-white text-2xl flex items-center justify-center transition"
            >
              −
            </button>
            <span className="text-xl font-bold text-white w-12 text-center">
              {item.qty}
            </span>
            <button
              onClick={() => dispatch(increaseQty(item.id))}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-600/50 text-white text-2xl flex items-center justify-center transition"
            >
              +
            </button>
          </div>

          {/* Subtotal & Remove */}
          <div className="flex flex-col sm:items-end gap-3">
            <span className="text-2xl font-bold text-emerald-400">
              ₹{item.price}
            </span>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;