import React from "react";
import { BiSearch, BiX } from "react-icons/bi";
function CustomerSubMenu() {
  return (
    <div
      style={{
        gridTemplateColumns: "15% 10% 75%",
      }}
      className="border-0 grid border-b-2"
    >
      <div className="flex justify-start items-center pl-3 border-r-2 font-bold text-black font-nunito ">
        Filters
      </div>
      <div className="flex justify-start items-center pl-3 font-bold text-black font-nunito ">
        Categories
      </div>

      <div className="  py-4 ">
        <div className="flex ml-10 w-2/5 items-center rounded-full border-2 border-gray-500 overflow-clip">
          <BiSearch className="ml-3" />
          <input
            type="text"
            placeholder="Search"
            className="p-[2px] text-sm placeholder:text-sm pl-3 w-full outline-none focus:border-sky-300 border-solid-black "
          />
          <BiX className="mr-3 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default CustomerSubMenu;
