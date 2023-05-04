import React from "react";

const SortedBy = () => {
  //product type, offer, all
  return (
    <div className="md:flex justify-between mx-10 mt-10">
      <div className="md:flex gap-5">
        <div className="sort">
          <p className="self-center">Product Types</p>
          <span className="material-symbols-outlined self-center">expand_more</span>
        </div>
        <div className="sort">
          <p className="self-center">Price</p>
          <span className="material-symbols-outlined self-center">expand_more</span>
        </div>
        <div className="sort">
          <p className="self-center">Offer</p>
          <span className="material-symbols-outlined self-center">expand_more</span>
        </div>
        <div className="sort">
          <p className="self-center">All Filters</p>
          <span className="material-symbols-outlined">background_grid_small</span>
        </div>
      </div>
      <div className="inline-flex gap-2 rounded-2xl border-gray-200 border-2 py-1 px-2 text-gray-500 cursor-pointer font-bold self-center">
        <p>Sort By</p>
        <span className="material-symbols-outlined self-center">expand_more</span>
      </div>
    </div>
  );
};

export default SortedBy;
