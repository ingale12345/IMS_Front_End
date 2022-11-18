import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRequisitionStatus } from "../../actions/requisitionsAction";
import InvoiceRequisitionDetails from "./InvoiceRequisitionDetails";
import demoprofileimage from "../../images/demoprofileimage.png";
function InvoiceInfo(props) {
  const { selectedOrder } = props;
  const dispatch = useDispatch();
  const [aTotal, setaotal] = useState(0);
  const [image, setImage] = useState(demoprofileimage);
  let allTotal = 0;
  const customer = useSelector((state) => state.usersReducer.users).find(
    (user) => user._id === selectedOrder.customer
  );
  const getTotal = (total) => {
    allTotal += total;
  };
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
  useEffect(() => {
    setaotal(allTotal);
  }, [selectedOrder]);

  const handleAccept = ({ requisitions }) => {
    // console.log("demo");
    requisitions.map((cr) => {
      dispatch(updateRequisitionStatus(cr._id, { status: "dispatched" }));
    });
  };
  const handleReject = ({ requisitions }) => {
    const value = window.confirm("Do you want to reject this order");
    if (value) {
      requisitions.map((cr) => {
        dispatch(updateRequisitionStatus(cr._id, { status: "cancelled" }));
      });
    }
  };

  return !selectedOrder ? (
    ""
  ) : !customer ? (
    ""
  ) : (
    <div
      className=" w-full h-full select-none grid"
      style={{ gridTemplateRows: "30% 70%" }}
    >
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="h-20 w-20 rounded-full border-2 overflow-clip flex items-center justify-center">
          <img className=" h-16 w-16 rounded-full" src={image} />
        </div>
        <div className="flex justify-center items-center font-nunito gap-2 font-bold">
          <span>{customer.firstName}</span>
          <span>{customer.lastName}</span>
          <span>+91 {customer.phone}</span>
        </div>
        <div className="flex justify-center items-center font-nunito gap-2 font-bold">
          {customer.address}
        </div>
      </div>
      <div className="h-full w-full p-2 gap-2 flex flex-col">
        <div className="bg-[#F3F3F3] rounded-lg flex justify-between items-center w-full h-12 font-nunito font-extrabold text-lg">
          <span className="ml-3">&#8377;{aTotal}</span>
          <span className="mr-3">
            {selectedOrder.requisitions.length} items
          </span>
        </div>
        <div className=" paper-window w-full h-[200px] overflow-y-auto gap-2">
          {selectedOrder.requisitions.map((requisition) => (
            <InvoiceRequisitionDetails
              getTotal={getTotal}
              key={requisition._id}
              requisition={requisition}
            />
          ))}
        </div>
        <div className="font-nunito font-semibold rounded-lg w-full h-16">
          <div className="w-full ">
            <span className="ml-3 text-[#57B2BA]">Bill Summary</span>
          </div>
          <div className="h-full items-center pb-6 flex justify-between">
            <span className="ml-3">Item Total</span>
            <span className="pr-3">&#8377;{aTotal}</span>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-lg w-full p-2 h-24 flex flex-col overflow-clip">
          <div className="w-full h-full px-1 flex justify-between">
            <span className="px-1 font-nunito font-semibold text-[#57B2BA]">
              Total
            </span>
            <span className="px-1 font-nunito font-bold">&#8377;{aTotal}</span>
          </div>
          {selectedOrder.requisitions[0].status === "placed" ? (
            <div className="w-full h-full px-1 flex justify-between ">
              <button
                onClick={() => handleReject(selectedOrder)}
                className="p-1 mx-2 w-32 bg-[#EB7C7B] rounded-full text-sm text-white font-nunito uppercase"
              >
                Reject
              </button>
              <button
                onClick={() => handleAccept(selectedOrder)}
                className="p-1 mx-2 w-32 bg-[#57B2BA] rounded-full text-sm text-white font-nunito uppercase"
              >
                Accept
              </button>
            </div>
          ) : selectedOrder.requisitions[0].status === "dispatched" ? (
            <div className="font-nunito text-sm flex gap-1 font-semibold justify-end px-3">
              This order is marked as
              <span className="text-[#59BB34] font-bold">DISPATCHED</span>
            </div>
          ) : (
            <div className="font-nunito text-sm flex gap-1 font-semibold justify-end px-3">
              This order is marked as
              <span className="text-[#ee4242] font-bold">CANCELLED</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceInfo;
