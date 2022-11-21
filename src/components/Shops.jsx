import React, { useEffect, useState } from "react";
import Card from "./common/Card";
import CustomerSubMenu from "./common/CustomerSubMenu";
import FilterBar from "./common/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoryOfShops,
  getAllShopsByCategory,
} from "../actions/shopAction";
import { getAllCategories } from "../actions/categoriesAction";
import ShopsByCategory from "./ShopsByCategory";
import ItemsByShops from "./ItemsByShops";
function Shops() {
  const [clickedCard, setClickedCard] = useState("");
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoriesReducer.categories);
  const allCategoriesOfShops = useSelector(
    (state) => state.shopsReducer.categoriesOfShops
  );
  const shopsByCategory = useSelector(
    (state) => state.shopsReducer.shopsByCategory
  );

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCategoryOfShops());
  }, []);

  useEffect(() => {
    dispatch(getAllShopsByCategory(details));
  }, [details]);

  const handleShopClick = (categoryId) => {
    setDetails({ categoryId });
  };

  const handleClickShop = (shopId) => {
    setDetails({ shopId });
  };
  return (
    <div>
      <CustomerSubMenu />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className="grid overflow-auto"
      >
        <FilterBar />
        <div
          style={{
            gridTemplateColumns: "15% 85%",
            height: "calc(100vh - 141px)",
          }}
          className=" grid"
        >
          <div id="categories" className="bg-slate-100 p-2 overflow-y-auto">
            {categories.map((category) => {
              if (allCategoriesOfShops[category._id]?.length !== 0) {
                return (
                  <Card
                    key={category._id}
                    clicked={clickedCard}
                    categoryId={category._id}
                    imgSrc={category.profile}
                    category={category.name}
                    shopsCount={allCategoriesOfShops[category._id]?.length}
                    onClick={handleShopClick}
                  />
                );
              }
            })}
          </div>

          {details.categoryId ? (
            <ShopsByCategory
              shopsByCategory={shopsByCategory}
              key={details.categoryId}
              categoryId={details.categoryId}
              handleClickShop={handleClickShop}
            />
          ) : details.shopId ? (
            <ItemsByShops key={details.shopId} shopId={details.shopId} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Shops;
