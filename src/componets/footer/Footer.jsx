import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    const color = ({ isActive }) => `text-slate-300 hover:text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] hover:underline underline-text-slate-300 ${isActive ? " text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]  " : ""} `




    return (
<div className='flex flex-col md:flex-row md:justify-around items-center bg-[rgb(28,38,41)] flex-wrap py-10 px-4 md:px-20'>

  {/* ----------------div1-------- */}
  <div className='flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0'>
    <img
      className="h-28 w-auto object-contain rounded-[70%] border-slate-900 p-1"
      src='Logo.jpg'
      alt='Logo'
    />
    <p className='text-slate-300 wrap-normal line-base/6 mt-4 md:mt-7'>
      A modern online bookstore for,<br /> readers and learners
    </p>
  </div>

  {/* ----------------div2-------------- */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20'>


    {/* -------------------subdiv1--------------------- */}
    <div className='flex flex-col gap-2.5 items-center md:items-start text-center md:text-left'>
      <div className='text-slate-300 font-semibold'>Contact Us</div>
      <NavLink to='/github' className={color}>GitHub</NavLink>
      <NavLink className={color}>LinkedIn</NavLink>
      <a className='text-slate-300' href='mailto:webmaster@example.com'>webmaster@example.com</a>
    </div>

    {/* -------------------subdiv2--------------------- */}
    <div className='flex flex-col gap-2.5 items-center md:items-start text-center md:text-left'>
      <div className='text-slate-300 font-semibold'>Resources</div>
      <NavLink className={color}>Terms & Conditions</NavLink>
      <NavLink className={color}>Shipping Policy</NavLink>
      <NavLink className={color}>Refund Policy</NavLink>
      <NavLink className={color}>Privacy Policy</NavLink>
    </div>

  </div>

</div>

    )
}

export default Footer
