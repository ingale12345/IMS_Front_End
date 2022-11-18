import React from "react";
import { Link } from "react-router-dom";
import firstImage from "../images/first.JPG";
import inventoryImage from "../images/inventory.JPG";
import { ToastContainer, toast } from "react-toastify";
function InventoryApp() {
  return (
    <div className="flex justify-center  items-center h-screen bg-gradient-to-r from-[#8ED89E] via-[#5DBFB0] to-[#58B4B9]">
      <div
        style={{
          backgroundImage: `url(${firstImage})`,
          backgroundRepeat: "no-repeat",
        }}
        className="h-[85%] w-[75%] bg-white shadow-slate-600 rounded-md drop-shadow-[0_2px_10px_#333] bg-center bg-contain"
      >
        <div className="w-full h-20 flex justify-between items-center">
          <div
            style={{
              backgroundImage: `url(${inventoryImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className=" w-48 h-full bg-contain"
          ></div>
          <div className="mx-10 w-32 flex justify-between xs:text-xs sm:text-sm">
            <Link
              to="/"
              className=" font-bold italic text-[#59B6BC] cursor-not-allowed  "
            >
              ABOUT US
            </Link>
            <Link
              to="/login"
              className=" font-bold italic text-black hover:text-green-500"
            >
              LOGIN
            </Link>
          </div>
        </div>
        <div className="w-[30%] pop-up mx-[60%] my-[10%] relative">
          <span className="font-bold text-xl">
            Inventory Management System (IMS)
          </span>
          <br />
          <span className="text-sm">
            is highly flexible and configurable web application to help
            shopkeepers to manage thrie inventory
          </span>
        </div>
      </div>
    </div>
  );
}

export default InventoryApp;
