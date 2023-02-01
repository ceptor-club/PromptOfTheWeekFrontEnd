import React, { useState } from 'react';

const ToolTip = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
      {hover && 
      <div className="absolute rounded-md bg-white text-black text-center font-medium py-1 px-2">
         <p className="text-xl">I am here to help!</p>
      </div>
      }
    </div>
  );
};

export default ToolTip;
