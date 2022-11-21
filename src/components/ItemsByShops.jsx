import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopData } from "../actions/shopAction";
import ItemsByItemClass from "./ItemsByItemClass";

function ItemsByShops(props) {
  const dispatch = useDispatch();
  const { shopId } = props;
  const shopData = useSelector((state) => state.shopsReducer.shopData);
  const { shopItems, shopName, itemClasses } = shopData;
  useEffect(() => {
    dispatch(getShopData(shopId));
  }, [shopId]);

  return (
    <div style={{ gridTemplateRows: "5% 95%" }} className="grid">
      <span className=" font-semibold  text-sm text-[#989898] pl-6 pt-1">
        You are shopping from
        <span className="font-bold pl-2">{shopName}</span>
      </span>
      <div className=" flex overflow-y-auto h-[490px] paper-window gap-6 ml-2 flex-col">
        {itemClasses?.map((itemclass) => {
          if (shopItems.length === 0) return;
          return (
            <ItemsByItemClass
              key={itemclass.itemClass}
              shopId={shopId}
              itemClass={itemclass.itemClass}
              noOfItems={itemclass.noOfItems}
              items={itemclass.item}
              shopItems={shopItems}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ItemsByShops;
