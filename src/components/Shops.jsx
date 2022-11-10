import React, { useEffect, useState } from "react";
import Card from "./common/Card";
import GroceryImage from "../images/shopsImgs/wheatImage.PNG";
import MedicalImage from "../images/shopsImgs/tabletsImg.PNG";
import HardwareImage from "../images/shopsImgs/hardware.jpg";
import CustomerSubMenu from "./common/CustomerSubMenu";
import FilterBar from "./common/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../actions/shopAction";
import { getAllCategories } from "../actions/categoriesAction";
import ShopsByCategory from "./ShopsByCategory";
import ItemsByShops from "./ItemsByShops";
function Shops() {
  const [clickedCard, setClickedCard] = useState("");
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shopsReducer.shops);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  useEffect(() => {
    dispatch(getAllShops());
    dispatch(getAllCategories());
  }, []);
  const getShopsByCategory = () => {
    let cw = {};
    categories.forEach((c) => {
      cw[c._id] = [];
      shops.forEach((shop) => {
        if (shop.category === c._id) {
          cw[c._id].push(shop);
        }
      });
    });
    return cw;
  };
  const handleShopClick = (categoryId) => {
    setDetails({ categoryId });
    // console.log(categoryId);
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
            {categories.map((c) => {
              const cats = getShopsByCategory();
              if (cats[c._id].length !== 0) {
                return (
                  <Card
                    key={c._id}
                    clicked={clickedCard}
                    categoryId={c._id}
                    imgSrc={c.profile}
                    // imgSrc={
                    //   c.name === "grocery"
                    //     ? GroceryImage
                    //     : c.name === "hardware"
                    //     ? HardwareImage
                    //     : c.name === "medical"
                    //     ? MedicalImage
                    //     : ""
                    // }
                    category={c.name}
                    shopsCount={cats[c._id].length}
                    onClick={handleShopClick}
                  />
                );
              }
            })}
          </div>

          {details.categoryId ? (
            <ShopsByCategory
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
