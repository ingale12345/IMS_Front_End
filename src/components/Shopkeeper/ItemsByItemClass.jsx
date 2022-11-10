import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../actions/itemsAction";
import { getAllShopItems } from "../../actions/shopItemsAction";
import ImgSrc from "../../images/shopsImgs/wheatImage.PNG";
import ShowImage from "../Admin/ShowImage";
import EditShopItem from "./EditShopItem";
function ItemsByItemClass(props) {
  const { itemClass, shopId, onShopItemDelete } = props;

  const [showPopUp, setShowPopUp] = useState(false);
  const [editClickItem, setEditClickItem] = useState({});
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.itemsReducer.items);
  const allShopItems = useSelector((state) => state.shopItemsReducer.shopItems);
  const shopItems = allShopItems.filter((si) => si.shop === shopId);
  const itemsByShop = [];
  shopItems.forEach((si) => {
    allItems.forEach((i) => {
      if (si.item === i._id) {
        itemsByShop.push(i);
      }
    });
  });

  const items = itemsByShop.filter((i) => i.itemClass === itemClass._id);
  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllShopItems());
  }, []);

  return items.length === 0 ? (
    ""
  ) : (
    <div style={{ gridTemplateRows: "15% 85%" }} className=" h-40  grid">
      <span className="pl-4 font-nunito font-semibold select-none">
        {itemClass.name}({items.length})
      </span>
      <div className=" overflow-x-scroll overflow-y-hidden whitespace-nowrap paper-window  h-full w-full  items-center ">
        {items.map((i) => (
          <div
            key={i._id}
            className="w-32 h-32 overflow-clip ml-2 cursor-pointer rounded-2xl border-2 bg-white border-sky-400 mx-2 inline-block"
          >
            {/* <div className="h-2/3 ">
              <img src={ImgSrc} alt="image" className="w-full object-cover" />
            </div> */}
            <ShowImage item={i} />
            <div
              className=" h-1/3 grid w-full"
              style={{ gridTemplateRows: "40% 60%" }}
            >
              <span className=" text-sm text-center  bg-white">{i.name}</span>
              <div
                style={{ gridTemplateColumns: "50% 50%" }}
                className="bg-gray-400 w-full h-full grid"
              >
                <span
                  onClick={() => onShopItemDelete({ itemId: i._id, shopId })}
                  className="bg-[#DBDBDB] w-full text-sm flex items-center pl-3"
                >
                  Delete
                </span>
                <span
                  onClick={() => {
                    setEditClickItem(i);
                    setShowPopUp(true);
                  }}
                  className="bg-[#57B2BA] w-full text-sm flex items-center pl-3"
                >
                  Edit
                </span>
                <div
                  className={`w-full h-screen p-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500/60 ${
                    showPopUp ? "block" : "hidden"
                  }`}
                  style={{
                    zIndex: "1",
                  }}
                >
                  <EditShopItem
                    setShowPopUp={setShowPopUp}
                    item={editClickItem}
                    shopId={shopId}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsByItemClass;
