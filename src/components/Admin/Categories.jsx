import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSubMenu from "./AdminSubMenu";
import Category from "./Category";
import {
  countCategory,
  deleteCategory,
  getAllCategories,
  getPFS,
  searchCategories,
} from "../../actions/categoriesAction";
import Pagination from "../common/Pagination";

function Categories() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [title, setTitle] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: 1 });
  const categories = useSelector((state) => state.categoriesReducer.categories);

  useEffect(() => {
    dispatch(countCategory({ title: "" }));
    dispatch(getPFS({ currentPage, pageSize, title }));
  }, []);

  const handleDelete = (categoryId) => {
    const value = window.confirm("Do you Want to Delete category");
    if (value) {
      dispatch(deleteCategory(categoryId));
    }
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchCategories(data));
  };

  const totalNoOfCategories = useSelector(
    (state) => state.categoriesReducer.count
  );

  // console.log(totalNoOfCategories);

  const handlePageChange = (currentPage) => {
    // console.log(currentPage);
    setCurrentPage(currentPage);
    const data = { currentPage, pageSize, title };
    dispatch(getPFS(data));
    dispatch(countCategory({ title }));
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
    dispatch(countCategory({ title }));
  };

  return (
    <div>
      <AdminSubMenu searchData={handleChange} btnName="Add Category" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2 flex justify-center">
          <Pagination
            itemsCount={totalNoOfCategories}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className=" flex p-5 gap-x-8 overflow-x-auto w-full flex-wrap">
          {categories.length === 0
            ? "categories not found"
            : categories.map((c) => (
                <Category
                  key={c._id}
                  categoryName={c.name}
                  categoryId={c._id}
                  categoryDeleteHandle={handleDelete}
                  profile={c.profile}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
