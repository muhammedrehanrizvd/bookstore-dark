import React from 'react';

function Dropdown({ setActiveGenre, setDrop, activeGenre }) {
  const genres = ["Business", "Islamic", "Fiction", "Self-Help", "Biography", "Science", "History"]; // Feel free to adjust

  const handleSelect = (genre) => {
    setActiveGenre(genre);
    setDrop(false);
  };

  return (
    <div
      className="
        w-64 
        rounded-2xl 
        bg-gradient-to-b from-gray-900/95 to-black/95 
        backdrop-blur-xl 
        border border-white/10 
        shadow-2xl shadow-purple-900/30 
        overflow-hidden 
        z-50
        animate-in fade-in-0 zoom-in-95 duration-200
      "
    >
      <div className="py-2">
        {genres.map((genre, index) => (
          <React.Fragment key={genre}>
            <button
              onClick={() => handleSelect(genre)}
              className={`
                w-full 
                flex items-center justify-between 
                px-6 py-4 
                text-left text-base font-medium 
                transition-all duration-300 
                group
                ${
                  activeGenre === genre
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white shadow-inner"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className="flex items-center gap-3">
                {/* Active indicator dot */}
                {activeGenre === genre && (
                  <span className="w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50" />
                )}
                <span className={activeGenre === genre ? "font-semibold" : ""}>
                  {genre}
                </span>
              </span>

              {/* Right chevron - subtle rotation on hover/active */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={`
                  text-gray-500 
                  group-hover:text-pink-400 
                  transition-all duration-300
                  ${activeGenre === genre ? "text-pink-400 rotate-90" : "rotate-0"}
                `}
              >
                <path
                  fillRule="evenodd"
                  d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.446L9.44 8 6.553 2.223a.5.5 0 0 1 .223-.67z"
                />
              </svg>
            </button>

            {/* Divider - only between items */}
            {index !== genres.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Optional: All Genres reset button at bottom */}
      {activeGenre && (
        <>
          <div className="h-px bg-white/10 mx-4 my-2" />
          <button
            onClick={() => {
              setActiveGenre(null);
              setDrop(false);
            }}
            className="
              w-full px-6 py-3 
              text-sm text-gray-400 hover:text-white 
              font-medium hover:bg-white/5 
              transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Clear Filter
          </button>
        </>
      )}
    </div>
  );
}

export default Dropdown;