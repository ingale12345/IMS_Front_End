import React from "react";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import Shops from "../Shops";
import Categories from "../Admin/Categories";
import ShopItems from "../Shopkeeper/ShopItems";
function FirstPageRouter() {
  const token = useSelector((state) => state.loginReducer.token);
  if (token) {
    const decode = jwt_decode(token);
    if (decode.role === "admin") {
      return <Categories />;
    }
    if (decode.role === "customer") {
      return <Shops />;
    }
    if (decode.role === "shopkeeper") {
      return <ShopItems />;
    }
  }
  return <>{}</>;
}

export default FirstPageRouter;
