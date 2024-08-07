import React from 'react'

export default function LoadingIndicator() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <img 
          src="/logo_origin.png" 
          alt="" 
          width={150}
          className="animate-spin-y"
        />
      </div>
    </div>
  )
}

// ... existing code ...