import React from 'react'

const AuthRight = () => {
  return (
    <div
    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
    style={{
      background:
        "linear-gradient(to right, #24ee50, #448a24, #0C521B, #054012)",
    }}
  >
    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
      <h4 className="mb-6 font-semibold">
        We are more than just a company...
      </h4>
      <h1 className="text-large ">
      <span style={{color:'#054012',fontWeight:'bold'}}>WE</span> ARE THE <span style={{color:'#24ee50',fontWeight:'bold'}}>FUTURE!!!</span>
      </h1>
    </div>
  </div>
  )
}

export default AuthRight