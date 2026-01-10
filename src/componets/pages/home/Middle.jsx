import React from 'react'
import { benefits } from '@/data/Benefit'
import Card from './Card'


function Middle() {
 
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-black overflow-hidden">

      {/* Background blur layer */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/5" />

      {/* Content wrapper (THIS CONTROLS HEIGHT) */}
      <div className="relative z-10 py-20">
        {/* grid div for card */}
        <div className="md:grid grid-cols-2 grid-rows-2 gap-4 flex flex-col justify-center items-center  ">
             
{benefits.map((benefit) => (
 
    <Card  key={benefit.id} title={benefit.title} description={benefit.description} className="md:ml-6" />

))}
        </div>
      </div>
           
    </section>
  )
}

export default Middle