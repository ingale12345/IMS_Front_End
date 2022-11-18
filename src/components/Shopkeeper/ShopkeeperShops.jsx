import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopkeeperSubMenu from "./ShopkeeperSubMenu";
import Shop from "./Shop";
import jwtDecode from "jwt-decode";
import { deleteShop, searchShops } from "../../actions/shopAction";
import { toast } from "react-toastify";

function ShopkeeperShops() {
  const dispatch = useDispatch();
  const decoded = jwtDecode(useSelector((state) => state.loginReducer.token));
  const shops = useSelector((state) => state.shopsReducer.shops).filter(
    (shop) => shop.owner === decoded._id
  );

  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchShops(data));
  };
  const handleDeleteShop = (shopId) => {
    const value = window.confirm("Do you want to delete this Shop");
    if (value) {
      dispatch(deleteShop(shopId));
    }
  };
  return (
    <div>
      <ShopkeeperSubMenu searchData={handleSearchData} btnName={"Add Shop"} />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2"></div>
        <div className=" flex flex-col p-5 gap-8 overflow-y-auto">
          {shops.length === 0 ? (
            <h1>shops Not Found</h1>
          ) : (
            shops.map((shop) => (
              <Shop key={shop._id} shop={shop} onDelete={handleDeleteShop} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperShops;

// import React from "react";
// import ShopkeeperSubMenu from "./ShopkeeperSubMenu";

// function ShopkeeperShops() {
//   return (
//     <div className="w-full grid" style={{ gridTemplateRows: "10% 90%" }}>
//       <ShopkeeperSubMenu btnName={"Add Shop"} />
//       <div className="w-full grid" style={{ gridTemplateColumns: "15% 85%" }}>
//         <div className="border-r-2 border-[#E5E7EB] ">demo</div>
//         <div className="">demo</div>
//       </div>
//     </div>
//   );
// }
