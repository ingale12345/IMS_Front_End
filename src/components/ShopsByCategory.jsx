import React from "react";
import { useSelector } from "react-redux";
import ImgSrc from "../images/shopsImgs/wheatImage.PNG";
import ShopDetails from "./common/ShopDetails";
function ShopsByCategory(props) {
  const { categoryId, handleClickShop,shopsByCategory } = props;
  const categories = useSelector((state) => state.categoriesReducer.categories);
  return (
    <div className="grid" style={{ gridTemplateRows: "5% 95%" }}>
      <div className="font-semibold  text-sm text-[#989898] pl-6">
        Showing results for
        <span className="mx-1">
          {categories.filter((c) => c._id === categoryId)[0].name}
        </span>
        shops
      </div>
      <div className=" flex flex-wrap">
        {shopsByCategory.map((shop) => {
            return (
              <ShopDetails
                key={shop._id}
                ImgSrc={
                  categories.filter((c) => c._id === categoryId)[0].profile
                }
                shopName={shop.name}
                shopId={shop._id}
                handleClickShop={handleClickShop}
              />
            );
        })}

      </div>
    </div>
  );
}

export default ShopsByCategory;
