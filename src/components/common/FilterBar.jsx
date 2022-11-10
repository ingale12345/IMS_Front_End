import React from "react";

function FilterBar() {
  return (
    <div className="h-full border-r-2">
      <div className="w-[80%]  mx-auto my-5">
        <span className="text-lg font-nunito font-bold">Sort By</span>
        <div className="flex flex-col h-24 text-md text-gray-500 font-normal pt-3 font-nunito justify-between ">
          <label className="cursor-pointer flex items-center">
            <input
              type="radio"
              name="sortByPrice"
              id="1"
              className="accent-[#316469] h-4 w-4 cursor-pointer"
            />
            <span className="pl-2  md:text-md">Relevance</span>
          </label>
          <label className="cursor-pointer flex items-center">
            <input
              type="radio"
              name="sortByPrice"
              id="2"
              className="accent-[#3b777d] h-4 w-4 cursor-pointer"
            />
            <span className="pl-2"> Lowest Price First</span>
          </label>
          <label className="cursor-pointer flex items-center">
            <input
              type="radio"
              name="sortByPrice"
              id="3"
              className="accent-[#285559] h-4 w-4 cursor-pointer"
            />
            <span className="pl-2"> Highest Price First</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
