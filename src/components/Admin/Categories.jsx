import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSubMenu from "./AdminSubMenu";
import Category from "./Category";
import {
  deleteCategory,
  getAllCategories,
  searchCategories,
} from "../../actions/categoriesAction";
function Categories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchCategories(data));
  };
  return (
    <div>
      <AdminSubMenu searchData={handleSearchData} btnName="Add Category" />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2">demo</div>
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
