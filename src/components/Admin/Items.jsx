import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { countItem, getAllItems, getPFS } from "../../actions/itemsAction";
import { deleteItem, searchItems } from "../../actions/itemsAction";

import Pagination from "../common/Pagination";
import AdminSubMenu from "./AdminSubMenu";
import ItemClassForItems from "./ItemClassForItems";

function Items() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPFS({ currentPage, pageSize, title }));
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [title, setTitle] = useState("");

  const totalNoOfItems = useSelector((state) => state.itemsReducer.count);

  const handlePageChange = (currentPage) => {
    // console.log(currentPage);
    setCurrentPage(currentPage);
    const data = { currentPage, pageSize, title };
    dispatch(getPFS(data));
    dispatch(countItem({ title }));
  };

  const handleChange = (e) => {
    let title = e.target.value.trim();
    if (title.length === 0) {
      setTitle("");
    }
    setCurrentPage(1);
    setTitle(title);
    dispatch(
      getPFS({
        currentPage: 1,
        pageSize,
        title,
      })
    );
    dispatch(countItem({ title }));
  };

  return (
    <div>
      <AdminSubMenu searchData={handleChange} btnName="Add Item" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2 flex justify-center">
          {" "}
          <Pagination
            itemsCount={totalNoOfItems}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
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
