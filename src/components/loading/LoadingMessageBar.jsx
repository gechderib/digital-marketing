import React from 'react'

const LoadingMessageBar = () => {
  return (
    <div className="flex items-center justify-between border border-gray-100 p-2 rounded-xl">
        <div className='flex items-center gap-5'>
            <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-600 w-10 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
  )
}

export default LoadingMessageBar