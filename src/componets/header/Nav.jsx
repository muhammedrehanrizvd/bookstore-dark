import React from 'react'
import { NavLink } from 'react-router-dom';

function Nav() {
    const navLinkClass = ({ isActive }) =>
        `relative px-3 py-2 text-white font-medium
     transition-all duration-300
     hover:text-white
     hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]
     ${isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,1)]" : ""}`;

    return (
        <div className='flex justify-between items-center flex-wrap w-full h-16 bg-slate-900 border-b border-slate-800  '>
            <div>
                <div className="text-xl font-semibold tracking-wide select-none">
                    <span className="text-white">Book</span>
                    <span className="text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]">
                        Store
                    </span>
                </div>



            </div>
            <div className='flex justify-between items-center'>
                <NavLink className={navLinkClass}
                    to='/'>Home</NavLink>
                <NavLink className={navLinkClass}
                    to='/about'>About</NavLink>
                <NavLink className={navLinkClass}
                    to='/stores'>Stores</NavLink>


                <NavLink className={navLinkClass}
                    to="/books">Books</NavLink>
            </div>
            <div>
                <NavLink className='  bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]' to='/join'>Join Now</NavLink>
            </div>


        </div>
    )
}

export default Nav
