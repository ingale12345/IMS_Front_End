import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopById } from "../../actions/shopAction";

import ItemsByItemClass from "./ItemsByItemClass";

function ShopItemsByShop(props) {
  const dispatch = useDispatch();
  const { shopItems, shopId, onShopItemDelete } = props;
  const items = useSelector((state) => state.itemsReducer.items);
  const shop = useSelector((state) => state.shopsReducer.shop);

  useEffect(() => {
    if (shopId === "") return;
    dispatch(getShopById(shopId));
  }, [shopId]);

  let itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );
  const newItems = [];
  items.forEach((item) => {
    shopItems.forEach((shopItem) => {
      if (shopItem.item === item._id) {
        newItems.push(item);
      }
    });
  });
  const newItemClasses = [];

  itemClasses = itemClasses.filter((itemClass) => {
    let available = false;
    newItems.forEach((item) => {
      if (
        item.itemClass === itemClass._id &&
        itemClass.category === shop.category
      ) {
        available = true;
        newItemClasses.push(itemClass);
      }
    });
    return available;
  });
  // itemClasses.forEach((itemClass) => {
  //   newItems.forEach((item) => {
  //     if (
  //       item.itemClass === itemClass._id &&
  //       itemClass.category === shop.category
  //     ) {
  //       newItemClasses.push(itemClass);
  //     }
  //   });
  // });
  return shopItems.length === 0 ? (
    <div>Items Not Found</div>
  ) : (
    <div className="h-full w-full ">
      {itemClasses.map((itemClass) => (
        <ItemsByItemClass
          onShopItemDelete={onShopItemDelete}
          key={itemClass._id}
          itemClass={itemClass}
          shopId={shopId}
        />
      ))}
    </div>
  );
}

export default ShopItemsByShop;
