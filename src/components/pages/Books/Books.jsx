import { useMemo, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Allbook from "./Allbook";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBooks, fetchBooksByGenre } from "../../../App/slices/BookSlice";
import BookCard from "./BookCard";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AnimatedContainer from "../../animations/CGanimate";
function Books() {
  const [isDrop, setDrop] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);
  const [visible, setVisible] = useState(12);
    const  {booksByGenre , genres} = useSelector(state=>state.book)
        const dispatch = useDispatch();
          useEffect(() => {
            dispatch(fetchAllBooks());
          }, [dispatch]);
        
          // ✅ Step 2: Fetch books for each genre (only if not loaded)
          useEffect(() => {
            if (genres.length > 0) {
              genres.forEach((genre) => {
                if (!booksByGenre[genre]) {  // ✅ FIXED: Prevent infinite loop
                  dispatch(fetchBooksByGenre({ genre, limit: 6 }));
                }
              });
            }
          }, [genres, dispatch, booksByGenre]);
        

  const filteredBooks = useMemo(() => {
  if (!activeGenre) return null;

  return booksByGenre[activeGenre] || [];
}, [activeGenre, booksByGenre]);


  const { id } = useParams();
  const paginatedBooks = filteredBooks ? filteredBooks.slice(0, visible) : [];

  useEffect(() => {
    setVisible(12);
  }, [activeGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-white pt-20 pb-16">
      {/* Show Book Detail Page if ID exists */}
      {id ? (
        <Outlet />
      ) : (
        <>
          {/* Hero Section with Filter Dropdown */}
          <section className="relative max-w-7xl mx-auto px-6 mb-16">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Discover Your Next Read
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore thousands of books across genres — handpicked for curious minds.
              </p>
            </div>

            {/* Elegant Genre Filter Button */}
            <div className="flex justify-center relative">
              <button
                onClick={() => setDrop(!isDrop)}
                className="
                  group
                  flex items-center gap-3
                  px-8 py-4
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-2xl
                  text-lg font-medium text-white
                  shadow-2xl shadow-black/50
                  hover:bg-white/10
                  hover:border-purple-500/50
                  hover:shadow-purple-500/20
                  transition-all duration-500
                  hover:scale-105
                "
              >
                <span>{activeGenre ? activeGenre : "All Genres"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className={`transition-transform duration-500 text-purple-400 group-hover:text-pink-400
                    ${isDrop ? "rotate-180" : ""}`}
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDrop && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50">
                  <Dropdown
                    setActiveGenre={setActiveGenre}
                    setDrop={setDrop}
                    activeGenre={activeGenre}
                  />
                </div>
              )}
            </div>

            {/* Active Genre Badge (when selected) */}
            {activeGenre && (
              <div className="flex justify-center mt-6">
                <span className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-medium shadow-lg">
                  Showing: {activeGenre}
                </span>
              </div>
            )}
          </section>

          {/* Books Grid or Allbook */}
          <section className="max-w-7xl mx-auto px-6">
            {filteredBooks === null ? (
              <AnimatedContainer key={activeGenre}>

                // All Books View
                <Allbook />
              </AnimatedContainer>
            ) : filteredBooks.length > 0 ? (
              <>
               
               <AnimatedContainer key={activeGenre}>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                  {paginatedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
               </AnimatedContainer>

                {/* Load More Button */}
                {visible < filteredBooks.length && (
                  <div className="flex justify-center mt-16">
                    <button
                      onClick={() =>
                        setVisible(v => Math.min(v + 12, filteredBooks.length))
                      }
                      className="
                        group
                        relative overflow-hidden
                        px-10 py-4
                        bg-gradient-to-r from-purple-600 to-pink-600
                        text-white font-semibold text-lg
                        rounded-xl
                        shadow-2xl shadow-purple-600/50
                        hover:shadow-pink-600/60
                        transition-all duration-500
                        hover:scale-110
                      "
                    >
                      <span className="relative z-10">Load More Books</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32">
                <p className="text-2xl text-gray-400">No books found in this genre yet.</p>
                <p className="text-gray-500 mt-4">Check back soon for new additions!</p>
              </div>



            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Books;