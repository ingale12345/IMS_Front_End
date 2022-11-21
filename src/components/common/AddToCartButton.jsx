import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequisition,
  getAllRequisitions,
  updateRequisition,
} from "../../actions/requisitionsAction";
import { getAllShopItems } from "../../actions/shopItemsAction";
import jwt_decode from "jwt-decode";
function AddToCartButton(props) {
  const { item, shopId, shopItems } = props;
  const dispatch = useDispatch();
  //const shopItems = useSelector((state) => state.shopItemsReducer.shopItems);
  const token = useSelector((state) => state.loginReducer.token);
  const requisitions = useSelector(
    (state) => state.requisitionsReducer.requisitions
  );
  useEffect(() => {
    //dispatch(getAllShopItems());
    dispatch(getAllRequisitions());
  }, []);

  const shopItem = shopItems.filter(
    (si) => si.shop === shopId && si.item === item._id
  );

  let requisition = requisitions.filter((req) => {
    return req.shopItem === shopItem[0]?._id && req.status === "created";
  });

  requisition = requisition[0];

  const updateRequiredQuantity = ({ reqId, updateValue }) => {
    dispatch(updateRequisition({ reqId, updateValue }));
  };
  const addNewRequisition = ({ itemId, shopId }) => {
    const decode = jwt_decode(token);
    let shopItem = {};
    shopItems.forEach((si) => {
      if (si.shop === shopId && si.item === itemId) {
        shopItem = si;
      }
    });

    dispatch(
      addRequisition({
        customer: decode._id,
        shopItem: shopItem._id,
        requiredQuntity: { amount: 1, unit: shopItem.availableQuantity.unit },
        preferredDeliveryDate: "2018-05-09",
      })
    );

    dispatch(getAllRequisitions());
  };
  return requisition ? (
    requisition.requiredQuntity.amount === 0 ? (
      <span
        onClick={() => {
          console.log("Clicked");
          addNewRequisition({ itemId: item._id, shopId });
        }}
        className="bg-[#1DB1BA] text-center  items-center justify-center"
      >
        Add
      </span>
    ) : requisition.status === "created" ? (
      <div className="bg-[#1DB1BA] flex h-full w-full text-white justify-between pl-2 pr-2">
        <span
          onClick={() =>
            updateRequiredQuantity({ reqId: requisition._id, updateValue: -1 })
          }
          className="text-center font-bold"
        >
          -
        </span>
        <span className="hover:cursor-default select-none">
          {requisition.requiredQuntity.amount}
        </span>
        <span
          onClick={() =>
            updateRequiredQuantity({ reqId: requisition._id, updateValue: 1 })
          }
          className="text-center font-bold "
        >
          +
        </span>
      </div>
    ) : (
      <span
        onClick={() => addNewRequisition({ itemId: item._id, shopId })}
        className="bg-[#1DB1BA] text-center items-center justify-center"
      >
        Add
      </span>
    )
  ) : (
    <span
      onClick={() => addNewRequisition({ itemId: item._id, shopId })}
      className="bg-[#1DB1BA] text-center items-center justify-center"
    >
      Add
    </span>
  );
}

export default AddToCartButton;
