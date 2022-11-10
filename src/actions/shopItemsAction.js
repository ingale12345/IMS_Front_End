import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "shopItems/";
export const getAllShopItems = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_SHOP_ITEMS,
        payload: { shopItems: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addShopItem = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data)
    .then((response) => {
      dispatch({
        type: actions.ADD_SHOP_ITEM,
        payload: { shopItem: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateShopItemQuantity = (data) => (dispatch) => {
  axios
    .put(apiEndPoint + data.shopItemId, data)
    .then((response) => {
      dispatch({
        type: actions.UPDATE_SHOP_ITEM_QUANTITY,
        payload: { shopItem: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateShopItemPrice = (data) => (dispatch) => {
  axios
    .patch(apiEndPoint + data.shopItemId, data)
    .then((response) => {
      dispatch({
        type: actions.UPDATE_SHOP_ITEM_PRICE,
        payload: { shopItem: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteShopItem = (shopItemId) => (dispatch) => {
  axios
    .delete(apiEndPoint + shopItemId)
    .then((response) => {
      dispatch({
        type: actions.DELETE_SHOP_ITEM,
        payload: { shopItem: response.data },
      });
    })
    .catch((err) => console.log(err));
};
