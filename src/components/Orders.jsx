import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerSubMenu from "./common/CustomerSubMenu";
import FilterBar from "./common/FilterBar";
import jwt_decode from "jwt-decode";
import { getAllRequisitions } from "../actions/requisitionsAction";
import { getAllShops } from "../actions/shopAction";
import OrderDetails from "./common/OrderDetails";
function Orders() {
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

  const requisitions = useSelector(
    (state) => state.requisitionsReducer.requisitions
  );
  const customerRequisitionsPlaced = requisitions.filter(
    (r) => r.customer === decode._id && r.status === "placed"
  );
  const customerRequisitionsDispached = requisitions.filter(
    (r) => r.customer === decode._id && r.status === "dispatched"
  );
  const customerRequisitionsCancelled = requisitions.filter(
    (r) => r.customer === decode._id && r.status === "cancelled"
  );

  const shops = useSelector((state) => state.shopsReducer.shops);
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
        {customerRequisitionsPlaced.length === 0 &&
        customerRequisitionsCancelled.length === 0 &&
        customerRequisitionsDispached.length === 0 ? (
          <div className="text-xl font-bold text-center font-nunito">
            ORDERS NOT FOUND
          </div>
        ) : (
          <div className=" p-6 overflow-x-auto">
            {shops.map((shop) => (
              <OrderDetails
                key={shop._id}
                shop={shop}
                customerRequisitions={customerRequisitionsPlaced}
                status={"PLACED"}
              />
            ))}
            {shops.map((shop) => (
              <OrderDetails
                key={shop._id}
                shop={shop}
                customerRequisitions={customerRequisitionsDispached}
                status={"DISPATCHED"}
              />
            ))}
            {shops.map((shop) => (
              <OrderDetails
                key={shop._id}
                shop={shop}
                customerRequisitions={customerRequisitionsCancelled}
                status={"CANCELLED"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
