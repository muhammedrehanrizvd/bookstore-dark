import React from 'react'
import Button from '../button/Button'


function Head({storeType,setStoreType}) {
 
   const Onlinehandler = ()=>{
    setStoreType('online')}
   const Offlinehandler = ()=>{
    setStoreType('offline')}

    return (
<div 
  className="relative bg-cover  bg-center min-h-[80vh]" 
  style={{ backgroundImage: "url('/Store.jpg')" }}
>
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="container  mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10 px-6 py-20">
    
    {/* Text Content */}
    <div className="md:w-1/2 text-white">
      <h1 className="text-5xl font-bold mb-6">Our Stores</h1>
      <p className="text-lg mb-8">
        We collaborate with trusted platforms and stores to ensure access
        to authentic, high-quality books for every reader.
      </p>

      {/* Store Types */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-white/90 text-gray-800 border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
               <Button onClick={Offlinehandler} title={'Offline Stores'} className={'h-[45px]  mb-3 rounded-full'}
               active={storeType=='offline'}
               />
          <p>Visit our physical locations and explore books in person.</p>
        </div>

        <div className="flex-1 bg-white/90 text-gray-800 border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <Button onClick={Onlinehandler} title={'Online Stores'} className={'h-[45px]  mb-3'}
          active={storeType=='online'}
          />
          <p>Shop from anywhere through our trusted online platforms.</p>
        </div>
      </div>
    </div>

    {/* Optional empty right side for layout balance */}
  
  </div>
</div>


  )
}

export default Head
