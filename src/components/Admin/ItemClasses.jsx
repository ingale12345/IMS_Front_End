import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemClass,
  getAllItemClasses,
  searchItemClasses,
} from "../../actions/itemClassesAction";
import AdminSubMenu from "./AdminSubMenu";
import ItemClass from "./ItemClass";

function ItemClasses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItemClasses());
  }, []);
  const itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );

  const handleDelete = (itemClassId) => {
    // console.log(itemClassId);

    const value = window.confirm("Do you Want to Delete this Item Class");
    if (value) {
      dispatch(deleteItemClass(itemClassId));
    }
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchItemClasses(data));
  };
  return (
    <div>
      <AdminSubMenu searchData={handleSearchData} btnName="Add Item Class" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className="grid"
      >
        <div className=" border-r-2"></div>
        <div className=" flex p-5 gap-8 flex-wrap overflow-y-auto paper-window">
          {itemClasses.length === 0
            ? "Item Classes Not found"
            : itemClasses.map((itemClass) => (
                <ItemClass
                  key={itemClass._id}
                  itemClassName={itemClass.name}
                  itemClassId={itemClass._id}
                  categoryId={itemClass.category}
                  itemClassDeleteHandle={handleDelete}
                  profile={itemClass.profile}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ItemClasses;
