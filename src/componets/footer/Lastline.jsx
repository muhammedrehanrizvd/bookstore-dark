import React from 'react'
import { useEffect, useState } from 'react'

function Lastline() {
    const text = '© 2025 BookStore. All rights reserved.'
      const [displayText, setDisplayText] = useState('')
      const [index, setIndex] = useState(0)
      const [isTyping, setIsTyping] = useState(true)
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          if (isTyping) {
            if (index < text.length) {
              setDisplayText(prev => prev + text[index])
              setIndex(prev => prev + 1)
            } else {
             setTimeout(() => {
      setIsTyping(false)
    }, 2000)
    
            }
          } else {
            if (index > 0) {
              setDisplayText(prev => prev.slice(0, -1))
              setIndex(prev => prev - 1)
            } else {
              setIsTyping(true)
            }
          }
        }, 100)
    
        return () => clearTimeout(timeout)
      }, [index, isTyping])
    
      return (
        <div className=" bg-[#FFE6E6] w-full h-8 flex items-center justify-center">
          <h2 className="text-pink-300 text-md [text-shadow:0_2px_8px_rgba(236,72,153,0.45)]">
            {displayText}
          </h2>
        </div>
      )
    }

export default Lastline
