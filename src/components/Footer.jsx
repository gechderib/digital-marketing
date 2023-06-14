import React from 'react';

const Footer = () => {
  return (
    
<footer>     
    <hr className="my-6 border-blueGray-300"></hr>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2021</span>
          <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> owned by</a>
          <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> shemeta</a>.
        </div>
      </div>
    </div>
</footer>
  )
}

export default Footer