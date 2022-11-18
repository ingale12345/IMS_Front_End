import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemClasses } from "../../actions/itemClassesAction";
import { getAllItems, searchItems } from "../../actions/itemsAction";
import { getAllShops } from "../../actions/shopAction";
import { deleteShopItem, getAllShopItems } from "../../actions/shopItemsAction";
import ShopItemsByShop from "./ShopItemsByShop";
import ShopkeeperSubMenu from "./ShopkeeperSubMenu";

function ShopItems() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopItems());
    dispatch(getAllShops());
    dispatch(getAllItems());
    dispatch(getAllItemClasses());
  }, []);

  const token = useSelector((state) => state.loginReducer.token);
  let shops = useSelector((state) => state.shopsReducer.shops);
  const [selectedShop, setSelectedShop] = useState("");
  let shopItems = useSelector((state) => state.shopItemsReducer.shopItems);
  if (token) {
    const decoded = jwtDecode(token);
    shops = shops.filter((shop) => shop.owner === decoded._id);
  }
  setTimeout(() => {
    if (selectedShop === "")
      if (shops.length != 0) setSelectedShop(shops[0]._id);
  }, 0);

  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchItems(data));
  };
  const handleChange = (shopId) => {
    setSelectedShop(shopId);
    const shop = shops.find((shop) => shop._id === shopId);

    shopItems = shopItems.filter((shopItem) => shopItem.shop === shopId);
  };

  const handleDeleteShopItem = (data) => {
    const value = window.confirm("Do you Want to Delete this Shop Item");
    if (value) {
      dispatch(
        deleteShopItem(
          shopItems.find(
            (shopItem) =>
              shopItem.shop === data.shopId && shopItem.item === data.itemId
          )._id
        )
      );
    }
  };

  return (
    <div>
      <ShopkeeperSubMenu
        btnName="Add Shop Item"
        searchData={handleSearchData}
        shopId={selectedShop}
      />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2"></div>
        <div
          className=" grid p-5  gap-2 "
          style={{ gridTemplateRows: "6% 90%" }}
        >
          <div>
            <span className="flex  w-2/5  items-center rounded-full border-2 border-gray-500 overflow-clip">
              <select
                onChange={(e) => handleChange(e.target.value)}
                className="p-[2px] text-sm placeholder:text-sm mx-3 w-full outline-none focus:border-sky-300 border-solid-black "
              >
                {/* <option value={"please select Shop"}>select Shop</option> */}
                {shops.map((shop, index) => {
                  return (
                    <option key={shop._id} value={shop._id}>
                      {shop.name}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
          <div className=" h-[439px] overflow-y-auto">
            {selectedShop === "" ? (
              "please select Shop"
            ) : (
              <ShopItemsByShop
                shopItems={shopItems}
                shopId={selectedShop}
                onShopItemDelete={handleDeleteShopItem}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopItems;
