import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderInfoByShop from "./OrderInfoByShop";
import RequisitionSubMenu from "./RequisitionSubMenu";
import ShopsByShopkeeper from "./ShopsByShopkeeper";
import {
  getAllRequisitions,
  getRequisitionByShop,
  requisitionsFilterByStatus,
} from "../../actions/requisitionsAction";
import RequisitionDetails from "./RequisitionDetails";
import InvoiceInfo from "./InvoiceInfo";
import { searchUsers } from "../../actions/userAction";
function Requisitions() {
  const [selectedShop, setSelectedShop] = useState("");
  const [statusClicked, setStatusClicked] = useState("");
  const dispatch = useDispatch();
  const requisitions = useSelector(
    (state) => state.requisitionsReducer.requisitions
  );
  useEffect(() => {
    if (selectedShop)
      dispatch(getRequisitionByShop(selectedShop, statusClicked));
  }, [selectedShop]);
  // console.log(requisitions);
  const selectedOrder = useSelector(
    (state) => state.selectedOrderReducer.selectedOrder
  );
  const placedRequisitions = requisitions.filter(
    (req) => req.status === "placed"
  );
  const dispatchedRequisitions = requisitions.filter(
    (req) => req.status === "dispatched"
  );
  const cancelledRequisitions = requisitions.filter(
    (req) => req.status === "cancelled"
  );

  // console.log(placedRequisitions);
  const handleSelectShop = (shopId) => {
    setSelectedShop(shopId);
    // console.log(shopId);
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchUsers(data));
  };
  const handleStatusClick = (clickValue) => {
    // console.log(clickValue);
    setStatusClicked(clickValue);
    dispatch(getRequisitionByShop(selectedShop, clickValue));
  };
  return (
    <div className="grid " style={{ gridTemplateColumns: "75% 25%" }}>
      <div className="h-full flex flex-col">
        <RequisitionSubMenu searchData={handleSearchData} />
        <div className="h-full grid" style={{ gridTemplateColumns: "20% 80%" }}>
          <div
            className="border-r-2 grid"
            style={{ gridTemplateRows: "30% 70%" }}
          >
            <div className="border-b-2 flex flex-col shadow m-2">
              <span className="flex ml-4 gap-2  items-center font-bold font-nunito">
                <input
                  onClick={(e) => handleStatusClick(e.target.value)}
                  className="accent-[#166d65] h-4 w-4 cursor-pointer"
                  type="radio"
                  value={""}
                  defaultChecked
                  name="status"
                  id="all"
                />
                <label htmlFor="">All</label>
              </span>

              <span className="flex ml-4 gap-2  items-center font-bold font-nunito">
                <input
                  onClick={(e) => handleStatusClick(e.target.value)}
                  className="accent-[#166d65] cursor-pointer  h-4 w-4"
                  type="radio"
                  value={"placed"}
                  name="status"
                  id="placed"
                />
                <label htmlFor="">placed</label>
              </span>
              <span className="flex ml-4 gap-2  items-center font-bold font-nunito">
                <input
                  onClick={(e) => handleStatusClick(e.target.value)}
                  className="accent-[#166d65] cursor-pointer  h-4 w-4"
                  type="radio"
                  value={"dispatched"}
                  name="status"
                  id="dispatched"
                />
                <label htmlFor="">dispatched</label>
              </span>
              <span className="flex ml-4 gap-2  items-center font-bold font-nunito">
                <input
                  onClick={(e) => handleStatusClick(e.target.value)}
                  className="accent-[#166d65] cursor-pointer  h-4 w-4"
                  type="radio"
                  value={"cancelled"}
                  name="status"
                  id="cancelled"
                />
                <label htmlFor="">cancelled</label>
              </span>
            </div>
            <div></div>
          </div>
          <div className=" grid " style={{ gridTemplateRows: "20% 80%" }}>
            <ShopsByShopkeeper
              handleClickShop={handleSelectShop}
              selectedShop={selectedShop}
            />
            <div className="overflow-y-auto h-[413px] paper-window">
              {placedRequisitions.length === 0 ? (
                ""
              ) : (
                <RequisitionDetails
                  selectedShop={selectedShop}
                  setSelectedShop={setSelectedShop}
                  requisitions={placedRequisitions}
                />
              )}
              {dispatchedRequisitions.length === 0 ? (
                ""
              ) : (
                <RequisitionDetails
                  selectedShop={selectedShop}
                  setSelectedShop={setSelectedShop}
                  requisitions={dispatchedRequisitions}
                />
              )}
              {cancelledRequisitions.length === 0 ? (
                ""
              ) : (
                <RequisitionDetails
                  selectedShop={selectedShop}
                  setSelectedShop={setSelectedShop}
                  requisitions={cancelledRequisitions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-l-2  border-gray-300">
        <InvoiceInfo selectedOrder={selectedOrder} />
      </div>
    </div>
  );
}

export default Requisitions;
