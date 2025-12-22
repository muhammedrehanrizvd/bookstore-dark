import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    const color = ({ isActive }) => `text-slate-300 hover:text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] hover:underline underline-text-slate-300 ${isActive ? " text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]  " : ""} `




    return (
        <div className='flex flex-col   md:flex md:flex-row md:justify-around items-center bg-[rgb(28,38,41)]  h-80 flex-wrap'>
   {/* ----------------div1-------- */}
            <div >

                <span className='inline-block mr-5'><img className="h-28 w-auto object-contain rounded-[70%]  border-slate-900 p-1 "
                    src='Logo.jpg' alt='loading' /></span>



                <span ><p className='text-slate-300 wrap-normal line-base/6 mt-7'>A modern online bookstore for,<br /> readers and learners</p></span>
            </div>
            {/* ---------------div 2-------------- */}
       
       
       
        <div className='flex  justify-between gap-7'>
        {/* ------------------- subdiv1--------------------- */}
            <div className>

            <address className=' flex flex-col gap-2.5'>
                <div className='text-slate-300'>Contact US</div>
                <NavLink to='/github' className={color}>GitHub</NavLink>
                <NavLink className={color}>LinkedIn</NavLink>
                <div><a className='text-slate-300' href='mailto:webmaster@example.com"'>mailto:webmaster@example.com"</a></div>

            </address>
            </div>



 {/* -------------------subdiv2--------------------- */}
            <div className='flex flex-col gap-2.5' >
                <div className='text-slate-300'>Resources</div>
                <NavLink className={color}>Terms&Conditons</NavLink>
                <NavLink className={color}>Shipping Policy</NavLink>
                <NavLink className={color}>Refund Policy</NavLink>
                <NavLink className={color}>Privacy Policy</NavLink>
            </div>
        </div>
        {/* ----------------------div2---------------------- */}
        </div>
    )
}

export default Footer
