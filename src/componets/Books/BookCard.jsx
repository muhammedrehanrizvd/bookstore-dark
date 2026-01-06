import React from "react";
import { useNavigate,useParams } from "react-router";

const BookCard = ({ book }) => {
  let navigate = useNavigate();

  return (
         
         
    <div className="group relative overflow-hidden rounded-2xl 
      bg-gradient-to-br from-slate-800 via-slate-900 to-black
      border border-slate-700/60 
      shadow-xl shadow-black/40 
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover 
          transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-2">
          {book.author}
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-emerald-400 font-bold text-lg">
            ₹{book.price}
          </span>

          <button onClick={()=>(navigate(`/books/${book.id}`))}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black
            hover:bg-emerald-400 transition">
            View
          </button>
        </div>
      </div>
    </div>
       
  );
};

export default BookCard;
