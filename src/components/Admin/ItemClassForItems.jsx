import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countItem, getAllItems, getPFS } from "../../actions/itemsAction";
import Pagination from "../common/Pagination";
import ItemForm from "./ItemForm";
import ShowImage from "./ShowImage";
function ItemClassForItems(props) {
  const { itemClass, itemDeleteHandle } = props;
  const [showPopUp, setShowPopUp] = useState(false);
  const [EditClickItem, setEditClickItem] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllItems());
    
    dispatch(countItem({ title: "" }));
  }, []);
  const items = useSelector((state) => state.itemsReducer.items);
  const newItems = items.filter((item) => item.itemClass === itemClass._id);
  // const newItems = [];
  // items.forEach((item) => {
  //   if (item.itemClass === itemClass._id) {
  //     newItems.push(item);
  //   }
  // });

  return newItems.length === 0 ? (
    ""
  ) : (
    <div style={{ gridTemplateRows: "15% 85%" }} className=" h-48 grid">
      <span className="pl-4 font-nunito font-semibold select-none">
        {itemClass.name}({newItems.length})
      </span>
      <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap paper-window w-full">
        {newItems.map((i) => (
          <div
            key={i._id}
            className="w-32 h-32 mx-2 inline-block overflow-clip ml-2 cursor-pointer rounded-2xl border-2 bg-white border-sky-400"
          >
            {/* <div className="h-2/3 ">
              <img src={ImgSrc} alt="image" className="w-full object-cover" />
            </div> */}
            <ShowImage item={i} />
            <div
              className=" h-1/3 grid w-full"
              style={{ gridTemplateRows: "40% 60%" }}
            >
              <span className=" text-sm text-center bg-white">{i.name}</span>
              <div
                style={{ gridTemplateColumns: "50% 50%" }}
                className="bg-gray-400 w-full h-full grid"
              >
                <span
                  onClick={() => itemDeleteHandle(i._id)}
                  className="bg-[#DBDBDB] w-full text-sm flex items-center pl-3"
                >
                  Delete
                </span>
                <span
                  onClick={() => {
                    setEditClickItem(i);
                    setShowPopUp((prev) => !prev);
                  }}
                  className="bg-[#57B2BA] w-full text-sm flex items-center pl-3"
                >
                  Edit
                </span>
                <div
                  className={`w-full h-screen absolute top-0 left-0 bg-gray-500/60 ${
                    showPopUp ? "block" : "hidden"
                  }`}
                >
                  <ItemForm
                    itemId={EditClickItem._id}
                    itemName={EditClickItem.name}
                    description={EditClickItem.description}
                    // itemId={i._id}
                    // itemName={i.name}
                    // description={i.description}
                    itemClassId={itemClass._id}
                    showPopUp={showPopUp}
                    setShowPopUp={setShowPopUp}
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

export default ItemClassForItems;
