import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import ShopItemDetails from "./ShopItemDetails";
function ItemList(props) {
  let { itemClass, register, shop, setShowAddButton } = props;
  const [showItemInfoPopUp, setShowItemInfoPopUp] = useState(false);
  let shopItems = useSelector((state) => state.shopItemsReducer.shopItems);
  let [items, setItems] = useState(
    useSelector((state) => state.itemsReducer.items)
  );
  const [selectedItem, setSelectedItem] = useState({});
  useEffect(() => {
    shopItems = shopItems.filter((shopItem) => shopItem.shop === shop._id);
    setItems(
      items.filter((item) => {
        let available = true;
        shopItems.forEach((shopItem) => {
          if (shopItem.item === item._id) {
            available = false;
          }
        });
        return available;
      })
    );
  }, [itemClass]);
  //   if (shop) {
  //     shopItems = shopItems.filter((shopItem) => shopItem.shop === shop._id);

  //     items = items.filter((item) => {
  //       let available = true;
  //       shopItems.forEach((shopItem) => {
  //         if (shopItem.item === item._id) {
  //           available = false;
  //         }
  //       });
  //       return available;
  //     });
  //   }
  const onCheckedItem = (e, item) => {
    // console.log(item);
    if (e.target.checked) {
      setShowItemInfoPopUp(true);
      setSelectedItem(item);
    } else {
      setShowItemInfoPopUp(false);
      setSelectedItem({});
    }
  };
  return (
    <div>
      {items.filter((item) => item.itemClass === itemClass).length === 0 ? (
        <div className="text-sm text-center text-red-600">
          Items not found for above Item type
          {setTimeout(() => {
            setShowAddButton(false);
          }, 1)
            ? ""
            : ""}
          <br />
          please select another Item type
          <br />
          or contact administrator
        </div>
      ) : (
        items
          .filter((item) => item.itemClass === itemClass)
          .map((item) => (
            <div
              className="bg-[#FAFAFA] p-2 flex items-center rounded-lg"
              key={item._id}
            >
              {setTimeout(() => {
                setShowAddButton(true);
              }, 1)
                ? ""
                : ""}
              <input
                {...register("items")}
                className="h-[16px] w-[16px]"
                type="checkbox"
                value={item._id}
              />
              <span className="font-nunito font-semibold text-md text-[#989898] ml-4">
                {item.name}
              </span>
            </div>
          ))
      )}
    </div>
  );
}

export default ItemList;
