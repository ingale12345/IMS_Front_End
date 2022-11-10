import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetails from "./common/CartDetails";
import CustomerSubMenu from "./common/CustomerSubMenu";
import FilterBar from "./common/FilterBar";
import jwt_decode from "jwt-decode";
import {
  deleteRequisition,
  getAllRequisitions,
  updateRequisitionStatus,
} from "../actions/requisitionsAction";
import { getAllShops } from "../actions/shopAction";
import { toast } from "react-toastify";
function Cart() {
  const token = useSelector((state) => state.loginReducer.token);
  const dispatch = useDispatch();
  let decode = {};
  if (token) {
    decode = jwt_decode(token);
  }
  useEffect(() => {
    dispatch(getAllShops());
    dispatch(getAllRequisitions());
  }, []);
  const removeRequisitionMessage = () =>
    toast.success("Requisition Successfully Removed from cart", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

  const requisitions = useSelector(
    (state) => state.requisitionsReducer.requisitions
  );
  const customerRequisitions = requisitions.filter(
    (r) => r.customer === decode._id && r.status === "created"
  );

  const shops = useSelector((state) => state.shopsReducer.shops);

  const removeRequisition = (requisitionId) => {
    dispatch(deleteRequisition(requisitionId));
    removeRequisitionMessage();
  };
  const handlePlaceOrder = (customerRequisitions) => {
    customerRequisitions.map((cr) => {
      dispatch(updateRequisitionStatus(cr._id, { status: "placed" }));
    });
  };
  return (
    <div>
      <CustomerSubMenu />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className="grid overflow-auto"
      >
        <FilterBar />
        <div className=" p-6 overflow-x-auto">
          {shops.map((shop) => (
            <CartDetails
              key={shop._id}
              shop={shop}
              customerRequisitions={customerRequisitions}
              removeRequisition={removeRequisition}
              handlePlaceOrder={handlePlaceOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
