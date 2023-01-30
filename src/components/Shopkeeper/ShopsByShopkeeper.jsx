import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
function ShopsByShopkeeper(props) {
  const { handleClickShop, selectedShop } = props;
  let shops = useSelector((state) => state.shopsReducer.shops);
  const token = useSelector((state) => state.loginReducer.token);
  const decoded = jwtDecode(token);
  shops = shops.filter((shop) => shop.owner === decoded._id);
  useEffect(() => {
    if (selectedShop === "") {
      handleClickShop(shops[0]?._id);
    }
  }, []);
  return (
    <div className=" mt-1 inline-block items-center overflow-x-auto overflow-y-hidden whitespace-nowrap paper-window  w-full">
      {shops.map((shop) => {
        return (
          <div
            onClick={() => handleClickShop(shop._id)}
            key={shop._id}
            className={`h-20 w-60 overflow-clip mx-2 bg-[#FAFAFA] inline-block  border-[3px] items-center rounded-2xl ${
              selectedShop === shop && shop._id ? "border-[#57B2BA]" : ""
            } cursor-pointer`}
          >
            <div className=" flex justify-center items-center h-full font-nunito font-semibold">
              {shop && shop.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ShopsByShopkeeper;
