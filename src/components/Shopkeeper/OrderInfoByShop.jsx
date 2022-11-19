import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_ORDER } from "../../actions/actionTypes";
import demoprofileimage from "../../images/demoprofileimage.png";
function OrderInfoByShop(props) {
  const dispatch = useDispatch();
  const { status, customerId, requisitionsOfCustomer } = props;
  const [image, setImage] = useState(demoprofileimage);
  const customer = useSelector((state) => state.usersReducer.users).find(
    (customer) => customer._id === customerId
  );
  const selectedOrder = useSelector(
    (state) => state.selectedOrderReducer.selectedOrder
  );

  useEffect(() => {
    if (customer?.profile) {
      function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const data = _arrayBufferToBase64(customer?.profile.image.data);
      const img = `data:${customer.profile?.mimetype};base64,` + data;
      setImage(img);
    }
  }, [customer]);

  // useEffect(() => {
  //   if (selectedOrder?.requisitions) {
  //     console.log(
  //       selectedOrder.requisitions[0]._id === requisitionsOfCustomer[0]._id
  //     );
  //   }
  // }, [selectedOrder]);

  const handleOrderClick = () => {
    dispatch({
      type: SET_SELECTED_ORDER,
      selectedOrder: {
        customer: customerId,
        requisitions: requisitionsOfCustomer,
      },
    });
  };
  // "border-[#57B2BA]"
  return (
    <div
      onClick={() => handleOrderClick()} //orderClick(customer, requisitionsOfCustomer)
      className={`h-20 cursor-pointer bg-[#FAFAFA] flex items-center flex-row rounded-xl border-4 gap-1 p-2  ${
        selectedOrder.customer === customerId &&
        selectedOrder.requisitions[0]._id === requisitionsOfCustomer[0]._id
          ? "border-[#57B2BA]  bg-[#ebebeb] "
          : "border-gray-300  bg-[#FAFAFA]"
      }`}
    >
      <div
        id="image"
        className="w-14 h-14  border-gray-500 border-2 rounded-full overflow-clip bg-red-400"
      >
        <img
          src={image}
          className="w-full object-cover h-full"
          alt="user Image"
        />
      </div>
      <div id="data" className="pl-2 w-full h-full">
        <div
          className="w-full  h-1/2 grid   "
          style={{
            display: "grid",
            gridTemplateColumns: "25% 20% 20% 15% 20%",
          }}
        >
          <span className="font-nunito font-semibold ">Name</span>
          <span className="font-nunito font-semibold ">Mobile</span>
          <span className="font-nunito font-semibold ">Date</span>
          <span className="font-nunito font-semibold ">Address</span>
          <span
            className={`font-nunito font-bold  text-md ${
              status === "placed"
                ? "text-[#57B2BA]"
                : status === "dispatched"
                ? "text-[#59BB34]"
                : "text-[#f54343]"
            } uppercase`}
          >
            {status}
          </span>
        </div>
        <div
          className="w-full  h-1/2 grid "
          style={{
            display: "grid",
            gridTemplateColumns: "25% 20% 20% 35% ",
          }}
        >
          <span className="font-nunito font-bold gap-2 flex">
            <span>{customer.firstName}</span>
            <span>{customer.lastName}</span>
          </span>
          <span className="font-nunito font-bold">{customer.phone}</span>
          <span className="font-nunito font-bold">01/06/2022</span>
          <span className="font-nunito font-bold text-sm" colSpan={"2"}>
            {customer.address}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderInfoByShop;
