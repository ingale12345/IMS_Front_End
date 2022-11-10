import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "itemClasses/";
export const getAllItemClasses = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_ITEM_CLASSES,
        payload: { itemClasses: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addItemClass = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: actions.ADD_ITEM_CLASS,
        payload: { itemClass: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateItemClass = (data) => (dispatch) => {
  axios
    .put(
      apiEndPoint + data.itemClassId,
      { ...data, name: data.name, category: data.category },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_ITEM_CLASS,
        payload: {
          itemClass: response.data,
        },
      })
    )
    .catch((err) => console.log(err));
};

export const searchItemClasses = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_ITEM_CLASSES,
        payload: { itemClasses: response.data },
      });
    })
    .catch((err) => console.log(err));
};
export const deleteItemClass = (itemClassId) => (dispatch) => {
  axios
    .delete(apiEndPoint + itemClassId)
    .then((response) => {
      dispatch({
        type: actions.DELETE_ITEM_CLASS,
        payload: { itemClass: response.data },
      });
    })
    .catch((err) => console.log(err));
};
