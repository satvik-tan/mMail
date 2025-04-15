import React from "react";

export const Logo = ({ className, size = "medium" }) => {
  const sizeClass = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16"
  }[size];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClass} rounded-lg p-2 bg-blue-600 bg-opacity-90 flex items-center justify-center`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="text-white w-full h-full"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </div>
      <span className="font-bold text-2xl text-white">mMail.</span>
      
    </div>
  );
};