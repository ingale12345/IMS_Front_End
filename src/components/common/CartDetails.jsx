import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemClasses } from "../../actions/itemClassesAction";
import { getAllItems } from "../../actions/itemsAction";
import { getAllShopItems } from "../../actions/shopItemsAction";
import CartShopItem from "./CartShopItem";

function CartDetails(props) {
  const { shop, customerRequisitions, removeRequisition, handlePlaceOrder } =
    props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllShopItems());
    dispatch(getAllItemClasses());
    dispatch(getAllItems());
  }, []);

  let total = 0;
  const items = useSelector((state) => state.itemsReducer.items);
  const itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );
  const shopItems = useSelector((state) => state.shopItemsReducer.shopItems);
  const newShopItems = shopItems.filter(
    (shopItem) => shopItem.shop === shop._id
  );
  const newCustomerRequisitions = [];
  newShopItems.forEach((nsi) => {
    customerRequisitions.forEach((cr) => {
      if (nsi._id === cr.shopItem) {
        newCustomerRequisitions.push(cr);
      }
    });
  });

  return newCustomerRequisitions.length === 0 ? (
    ""
  ) : (
    <div className="bg-[#f3f0f0] w-full h-64 mb-4 rounded-2xl flex flex-col px-6">
      <div className="w-full text-[#989898] h-8 flex items-center my-3 justify-between">
        <span className="font-nunito ">
          You are shopping from
          <span className="text-lg font-bold pl-1">{shop.name}</span>
        </span>
        <span className="">01/06/2022</span>
      </div>
      <div className="w-full h-24 border-b overflow-y-auto border-black flex flex-col gap-2">
        {newCustomerRequisitions.map((cr) => {
          const shopItem = shopItems.find(
            (shopItem) => shopItem._id === cr.shopItem
          );
          const item = items.find((item) => item._id === shopItem.item);
          const itemClass = itemClasses.find((ic) => {
            return ic._id === item.itemClass;
          });
          // total = +total + +cr.amount * +shopItem.price;
          total = total + +cr.requiredQuntity.amount * +shopItem.price;
          return (
            <CartShopItem
              key={cr._id}
              customerRequisition={cr}
              item={item}
              itemClass={itemClass}
              shopItem={shopItem}
              removeRequisition={removeRequisition}
            />
          );
        })}
      </div>
      <div className=" w-full h-12 flex justify-end items-center mt-12 border-t border-black">
        <div>
          <span className="text-[#989898] font-semibold">Please Pay</span>
          <span className="text-black font-bold pl-3">&#8377;{total}</span>
          <button
            onClick={() => handlePlaceOrder(newCustomerRequisitions)}
            className="mx-5 p-1 bg-[#1DB1BA] hover:bg-[#189198] rounded-full text-white font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
