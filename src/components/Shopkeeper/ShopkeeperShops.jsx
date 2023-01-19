import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopkeeperSubMenu from "./ShopkeeperSubMenu";
import Shop from "./Shop";
import jwtDecode from "jwt-decode";
import {
  countShops,
  deleteShop,
  searchShops,
  shopPFS,
} from "../../actions/shopAction";
import Pagination from "../common/Pagination";
import { useState } from "react";
function ShopkeeperShops() {
  const dispatch = useDispatch();
  const decoded = jwtDecode(useSelector((state) => state.loginReducer.token));
  const shops = useSelector((state) => state.shopsReducer.shops);
  const totalNoOfShops = useSelector((state) => state.shopsReducer.count);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState(decoded._id);

  useEffect(() => {
    dispatch(countShops({ title, owner }));
    dispatch(shopPFS({ currentPage, pageSize, title, owner }));
  }, []);

  const handleSearchData = (data) => {
    data = data.trim();
    setTitle(data);
    setCurrentPage(1);
    dispatch(countShops({ title: data, owner }));
    dispatch(shopPFS({ currentPage: 1, pageSize, title: data, owner }));
  };
  const handleDeleteShop = (shopId) => {
    const value = window.confirm("Do you want to delete this Shop");
    if (value) {
      dispatch(deleteShop(shopId));
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(countShops({ title, owner }));
    dispatch(shopPFS({ currentPage: page, pageSize, title, owner }));
    // console.log(page);
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
        <div style={{ gridTemplateRows: "80% 20%" }} className="grid">
          <div className=" flex flex-col p-5 gap-8 overflow-y-auto">
            {shops.length === 0 ? (
              <h1>shops Not Found</h1>
            ) : (
              shops.map((shop) => (
                <Shop key={shop._id} shop={shop} onDelete={handleDeleteShop} />
              ))
            )}
          </div>
          <div>
            <Pagination
              itemsCount={totalNoOfShops}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
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
