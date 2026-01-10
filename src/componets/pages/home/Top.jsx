import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Top() {
          let navigate = useNavigate();
    return (
        <>
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <img
                    className="w-full h-full object-cover"
                    src="/Homeimage.jpg"
                    alt="A captivating bookstore scene inviting you to explore endless stories"
                />

                {/* Dark Overlay with Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

                {/* Text Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-slate-100 text-3xl sm:text-4xl md:text-6xl font-bold fade-up mb-4 drop-shadow-2xl animate-fade-up">
                        Welcome to My Bookstore
                    </h1>

                    <p className="text-slate-300 text-base sm:text-lg md:text-2xl fade-up mb-8 max-w-xl leading-relaxed animate-fade-up [animation-delay:200ms]">
                        Discover your next favorite book today—where stories come alive in the glow of imagination.
                    </p>

                    <button  onClick={()=>(navigate('/books'))} className="group relative inline-flex items-center fade-up justify-center px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-slate-100 text-lg font-semibold rounded-xl border border-slate-700/50 shadow-xl shadow-black/30 hover:bg-slate-700/90 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-up [animation-delay:400ms] focus:outline-none focus:ring-4 focus:ring-blue-500/20">
                        <span className="relative z-10">Explore Books</span>
                        {/* Subtle shine line on hover */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform-gpu" />
                    </button>
                </div>
            </div>
        </>
    );
}
