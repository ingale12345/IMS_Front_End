import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "shops/";

export const getAllShops = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_SHOPS,
        payload: { shops: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addShop = (data) => (dispatch) => {
  const addShopMessage = (name) =>
    toast.success(name + " shop Added Successfully", { autoClose: 2000 });
  axios
    .post(apiEndPoint, data)
    .then((response) => {
      addShopMessage(response.data.name);
      dispatch({ type: actions.ADD_SHOP, payload: { shop: response.data } });
    })
    .catch((err) => console.log(err));
};

export const updateShop = (data) => (dispatch) => {
  const updateShopMessage = (name) =>
    toast.success(name + " Shop Updated Successfully", { autoClose: 2000 });
  axios
    .put(apiEndPoint + data._id, data)
    .then((response) => {
      updateShopMessage(response.data.name);
      dispatch({ type: actions.UPDATE_SHOP, payload: { shop: response.data } });
    })
    .catch((err) => console.log(err));
};

export const searchShops = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_SHOPS,
        payload: { shops: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteShop = (shopId) => (dispatch) => {
  const deleteShopMessage = (name) =>
    toast.success(name + " Shop Deleted Successfully", { autoClose: 2000 });
  axios
    .delete(apiEndPoint + shopId)
    .then((response) => {
      deleteShopMessage(response.data.name);
      dispatch({ type: actions.DELETE_SHOP, payload: { shop: response.data } });
    })
    .catch((err) => console.log(err));
};

//changes

export const getAllCategoryOfShops = () => (dispatch) => {
  axios
    .get(apiEndPoint + "shopscategory/data")
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_CATEGORIES_OF_SHOPS,
        payload: { categoriesOfShops: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const getAllShopsByCategory = (categoryId) => (dispatch) => {
  axios
    .post(apiEndPoint + "shopsbycategory", categoryId)
    .then((response) => {
      dispatch({
        type: actions.GET_All_SHOPS_BY_CATEGORY,
        payload: { shopsByCategory: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const getShopData = (shopId) => (dispatch) => {
  axios
    .post(apiEndPoint + "shopdata", { shopId })
    .then((response) => {
      dispatch({
        type: actions.GET_SHOP_DATA,
        payload: { shopData: response.data },
      });
    })
    .catch((err) => console.log(err));
};
