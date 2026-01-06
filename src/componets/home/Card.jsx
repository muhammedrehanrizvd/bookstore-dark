import React from 'react'

function Card({title,description,className}) {
  
    return (
<>
<div className={`relative overflow-hidden rounded-2xl h-auto  w-[95vw]  md:w-[45vmax] px-12 
bg-gradient-to-br from-slate-800/80 via-slate-900 to-black/80
border border-slate-700/50
shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
transition-all duration-300 hover:-translate-y-1
hover:shadow-[0_18px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
group ${className}`}>

  {/* abstract shape for shine */}
  <div className="absolute -right-10 top-1/2 -translate-y-1/2
  w-52 h-52 rounded-full bg-blue-500/10 blur-xl" />

  <div className="relative z-10 mt-24 mb-16">

    <span className="inline-block mb-6 px-3 py-1 text-xs font-semibold
    tracking-widest uppercase bg-slate-700/50 backdrop-blur-sm text-slate-300 rounded-full border border-slate-600/30
    transition-all duration-300 group-hover:bg-slate-600/70 group-hover:text-blue-300 group-hover:border-blue-500/50 group-hover:shadow-md group-hover:shadow-blue-500/20">
     BookStore
    </span>

    <h1 className="text-2xl font-semibold text-slate-100 mb-4 drop-shadow-sm">
      { title}
    </h1>

    <p className="text-slate-300 text-sm leading-relaxed max-w-md drop-shadow-sm">
      {description}
    </p>

  </div>
</div>

</>
    )
}

export default Card