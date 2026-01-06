import React from "react";
import { motion } from "framer-motion";

function CardStore({ name, address, type, link, rating, contact,className}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex ${className} flex-col items-center`}
    >
      {/* Store Name */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{name}</h3>

      {/* Address (offline) or Website (online) */}
      {type === "offline" && <p className="text-gray-600 text-center text-sm">{address}</p>}

      {/* Rating (optional) */}
      {rating && (
        <div className="flex justify-center gap-1 mt-2">
          {Array(Math.floor(rating)).fill(0).map((_, i) => (
            <span key={i} className="text-yellow-400">⭐</span>
          ))}
          <span className="text-gray-500 text-sm">({rating})</span>
        </div>
      )}

      {/* Contact (optional) */}
      {contact && (
        <div className="flex justify-center items-center gap-1 mt-2 text-gray-700 text-sm">
          📞 {contact}
        </div>
      )}

      {/* Buttons: Visit Store (online) / View Map (offline) */}
      <div className="flex justify-center mt-3">
        {type === "online" && link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium hover:underline"
          >
            🔗 Visit Store
          </a>
        )}

        {type === "offline" && (
          <button className="text-blue-500 font-medium hover:underline">
            📍 View on Map
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default CardStore;
