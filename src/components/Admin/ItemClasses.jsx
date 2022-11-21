import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  countItemClass,
  deleteItemClass,
  getPFS,
  searchItemClasses,
} from "../../actions/itemClassesAction";
import Pagination from "../common/Pagination";
import AdminSubMenu from "./AdminSubMenu";
import ItemClass from "./ItemClass";

function ItemClasses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPFS({ currentPage, pageSize, title }));
    dispatch(countItemClass());
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [title, setTitle] = useState("");

  const totalNoOfItemClasses = useSelector(
    (state) => state.itemClassesReducer.count
  );

  const handlePageChange = (currentPage) => {
    // console.log(currentPage);
    setCurrentPage(currentPage);
    const data = { currentPage, pageSize, title };
    dispatch(getPFS(data));
    dispatch(countItemClass({ title }));
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
    dispatch(countItemClass({ title }));
  };

  return (
    <div>
      <AdminSubMenu searchData={handleChange} btnName="Add Item Class" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className="grid"
      >
        <div className=" border-r-2 flex justify-center">
          {" "}
          <Pagination
            itemsCount={totalNoOfItemClasses}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
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
