import React from 'react'

const ThreadUnrollSuspense = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md overflow-hidden">
      <svg className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="text-blue-200" stroke="currentColor" strokeWidth="6" fill="none" cx="50" cy="50" r="40" />
        <path
          className="text-blue-500"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          d="M50 10
             a 40 40 0 0 1 0 80
             a 40 40 0 0 1 0 -80"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <div className="text-lg font-semibold text-blue-500 mt-4 animate-bounce">
        Unrolling thread...
      </div>
    </div>
  )
}

export default ThreadUnrollSuspense

