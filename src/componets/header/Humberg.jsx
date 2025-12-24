import React,{useState} from 'react'
import { Fade as Hamburger } from 'hamburger-react'
import { NavLink } from 'react-router-dom'


function Humberg({className}) {
    const [open, setopen] = useState(false)
    const navcolor = ({isActive})=>`text-slate-200 hover:text-white
hover:bg-slate-700/50 border-b border-slate-700 text-3XL ${isActive? "drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]": ""}`
    
    return (
        <>
        <div className={` border-1-solid border-slate-100 bg-slate-300 rounded-sm ${className}`}>
            <Hamburger
             toggled={open} 
             toggle={setopen}
             color='black' />
       </div>
       {open && <div className='bg-slate-900/95 backdrop-blur-md fixed inset-0 z-50 '>
       
            <Hamburger
             toggled={open} 
             toggle={setopen}
             color='white' />
    
       {/* -----------------------links---------------------- */}
                 <div className='flex flex-col space-y-6 mt-6'>
                    <NavLink className={navcolor  }  to='/' >Home</NavLink>
                    <NavLink  className={navcolor}  to='/about'>About</NavLink>
                    <NavLink className={navcolor}  to='/stores'>Stores</NavLink>
                    <NavLink className={navcolor}  to='/join'>Join Now</NavLink>
                 </div>
        </div> }
       
        </>
    )
}

export default Humberg
