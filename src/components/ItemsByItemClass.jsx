import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../actions/itemsAction";
import { getAllShopItems } from "../actions/shopItemsAction";
import ImgSrc from "../images/shopsImgs/wheatImage.PNG";
import ShowImage from "./Admin/ShowImage";
import AddToCartButton from "./common/AddToCartButton";
function ItemsByItemClass(props) {
  const { itemClass, shopId } = props;
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
  //const items = allItems.filter((i) => i.itemClass === itemClass._id);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllShopItems());
  }, []);

  return (
    <div style={{ gridTemplateRows: "15% 85%" }} className=" h-48 grid">
      <span className="pl-4 font-nunito font-semibold select-none">
        {itemClass.name}({items.length})
      </span>
      <div
        className="
      overflow-x-scroll overflow-y-hidden whitespace-nowrap paper-window  h-full w-full  items-center
      "
      >
        {items.map((i) => (
          <div
            key={i._id}
            className="w-40 h-32 overflow-clip ml-2 cursor-pointer rounded-2xl border-2 bg-white border-sky-400
           mx-2 inline-block 
            "
          >
            {/* <div className="h-2/3 ">
              <img src={ImgSrc} alt="image" className="w-full object-cover" />
            </div> */}

            <ShowImage item={{ profile: i.profile }} />

            {/* <div className="h-2/3 ">
              <img src={ImgSrc} alt="image" className="w-full object-cover" />
            </div> */}

            <div
              className=" h-1/3 grid w-full"
              style={{ gridTemplateRows: "40% 60%" }}
            >
              <span className="text-sm text-center bg-white font-bold">
                {i.name}
              </span>
              <div
                style={{ gridTemplateColumns: "55% 45%" }}
                className=" w-full h-full grid"
              >
                <span className=" font-semibold bg-[#DBDBDB] w-full text-sm flex justify-start items-center pl-3">
                  {/* 50  */}
                  &#8377;
                  {allShopItems.filter((si) => si.item === i._id)[0].price}/
                  {
                    allShopItems.filter((si) => si.item === i._id)[0]
                      .availableQuantity.unit
                  }
                </span>
                <AddToCartButton item={i} shopId={shopId} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsByItemClass;
