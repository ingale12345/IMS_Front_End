import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderInfoByShop from "./OrderInfoByShop";
import { getAllUsers } from "../../actions/userAction";
import { SET_SELECTED_ORDER } from "../../actions/actionTypes";
function RequisitionDetails(props) {
  const { requisitions, selectedShop, setSelectedShop } = props;
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.usersReducer.users).filter(
    (user) => user.role === "customer"
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const selectedOrder = useSelector(
    (state) => state.selectedOrderReducer.selectedOrder
  );
  let customerRequisitions = {};
  customers.forEach((customer) => {
    customerRequisitions[customer._id] = [];
    requisitions.forEach((requisition) => {
      if (requisition.customer === customer._id) {
        customerRequisitions[customer._id].push(requisition);
      }
    });
  });

  useEffect(() => {
    if (Object.keys(customerRequisitions).length != 0) {
      console.log("shop changed");
      if (Object.keys(selectedOrder).length === 0) {
        dispatch({
          type: SET_SELECTED_ORDER,
          selectedOrder: {
            customer: Object.keys(customerRequisitions).filter((key) =>
              customerRequisitions[key].length !== 0 ? true : false
            )[0],
            requisitions:
              customerRequisitions[
                Object.keys(customerRequisitions).filter((key) =>
                  customerRequisitions[key].length !== 0 ? true : false
                )[0]
              ],
          },
        });
      }
    }
  }, [selectedShop]);

  // setTimeout(() => {
  //   if (Object.keys(customerRequisitions).length != 0) {
  //     if (Object.keys(selectedOrder).length === 0) {
  //       dispatch({
  //         type: SET_SELECTED_ORDER,
  //         selectedOrder: {
  //           customer: Object.keys(customerRequisitions).filter((key) =>
  //             customerRequisitions[key].length !== 0 ? true : false
  //           )[0],
  //           requisitions:
  //             customerRequisitions[
  //               Object.keys(customerRequisitions).filter((key) =>
  //                 customerRequisitions[key].length !== 0 ? true : false
  //               )[0]
  //             ],
  //         },
  //       });
  //     }
  //   }
  // }, 10);
  //className="bg-yellow-300 p-3 flex paper-window flex-col gap-3 h-[413px] overflow-y-auto"
  return (
    <div className="p-3 flex paper-window flex-col gap-3 overflow-y-auto">
      {Object.keys(customerRequisitions).length === 0
        ? ""
        : Object.keys(customerRequisitions).map((key) => {
            return customerRequisitions[key].length === 0 ? (
              ""
            ) : (
              <OrderInfoByShop
                key={key}
                customerId={key}
                requisitionsOfCustomer={customerRequisitions[key]}
                status={customerRequisitions[key][0].status}
              />
            );
          })}
    </div>
  );
}

export default RequisitionDetails;

// [{
//   cid1: [{}, {}, {}];
//   cid2: [{}, {}, {}];
//   cid3: [{}, {}, {}];
// }]
