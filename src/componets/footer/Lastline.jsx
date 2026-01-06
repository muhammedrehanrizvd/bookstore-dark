import React, { useEffect, useState } from 'react';

function Lastline() {
  const text = '© 2026 BookStore. All rights reserved.';
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else {
          setTimeout(() => {
            setIsTyping(false);
          }, 2000); // Pause before deleting
        }
      } else {
        if (index > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [index, isTyping, text]);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-pink-950 to-gray-900 py-4 border-t border-pink-800/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        <p className="text-sm md:text-base font-medium text-pink-200 tracking-wider">
          <span className="inline-block min-w-[4px] bg-pink-400 animate-pulse">|</span>{' '}
          {/* Blinking cursor */}
          <span className="text-pink-300 drop-shadow-md">
            {displayText}
          </span>
          <span className="inline-block min-w-[4px] bg-pink-400 animate-pulse ml-1">|</span>
          {/* Second cursor for style */}
        </p>
      </div>

      {/* Optional subtle glow effect below */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-600/30 to-transparent"></div>
    </div>
  );
}

export default Lastline;