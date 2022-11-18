import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemClasses } from "../../actions/itemClassesAction";
import { deleteItem, searchItems } from "../../actions/itemsAction";
import AdminSubMenu from "./AdminSubMenu";
import ItemClassForItems from "./ItemClassForItems";

function Items() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemClasses());
  }, []);

  const itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );
  const items = useSelector((state) => state.itemsReducer.items);
  const newItems = [];
  //   items = items.filter((item) => {
  //     itemClasses.forEach((itemClass) => {

  //     });
  //   });
  items.forEach((item) => {
    itemClasses.forEach((itemClass) => {
      if (itemClass._id === item.itemClass) {
      }
    });
  });

  const handleDelete = (itemId) => {
    const value = window.confirm("Do you Want to Delete this Item");
    if (value) {
      dispatch(deleteItem(itemId));
    }
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchItems(data));
  };
  return (
    <div>
      <AdminSubMenu searchData={handleSearchData} btnName="Add Item" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2"></div>
        <div className=" flex flex-col p-5 gap-8 overflow-y-auto">
          {itemClasses.map((itemClass) => (
            <ItemClassForItems
              key={itemClass._id}
              itemClass={itemClass}
              itemDeleteHandle={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
