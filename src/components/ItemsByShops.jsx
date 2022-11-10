import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemClasses } from "../actions/itemClassesAction";
import { getAllItems } from "../actions/itemsAction";
import { getAllShopItems } from "../actions/shopItemsAction";
import ItemsByItemClass from "./ItemsByItemClass";

function ItemsByShops(props) {
  const dispatch = useDispatch();
  const { shopId } = props;
  const shops = useSelector((state) => state.shopsReducer.shops);
  const AllItems = useSelector((state) => state.itemsReducer.items);
  const allShopItems = useSelector((state) => state.shopItemsReducer.shopItems);

  const shopItems = allShopItems.filter((si) => si.shop === shopId);
  const itemsByShop = [];
  shopItems.forEach((si) => {
    AllItems.forEach((i) => {
      if (si.item === i._id) {
        itemsByShop.push(i);
      }
    });
  });

  const itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );
  const shop = shops.find((s) => s._id === shopId);
  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllItemClasses());
    dispatch(getAllShopItems());
  }, []);
  const itemClassesByShop = itemClasses.filter(
    (ic) => ic.category === shop.category
  );
  return (
    <div style={{ gridTemplateRows: "5% 95%" }} className="grid">
      <span className=" font-semibold  text-sm text-[#989898] pl-6 pt-1">
        You are shopping from
        <span className="font-bold pl-2">{shop.name}</span>
      </span>
      <div className=" flex overflow-y-auto h-[490px] paper-window gap-6 ml-2 flex-col">
        {itemClassesByShop.map((ic) => {
          const items = itemsByShop.filter((i) => {
            return i.itemClass === ic._id;
          });
          if (items.length === 0) return;
          return (
            <ItemsByItemClass key={ic._id} itemClass={ic} shopId={shopId} />
          );
        })}
      </div>
    </div>
  );
}

export default ItemsByShops;
