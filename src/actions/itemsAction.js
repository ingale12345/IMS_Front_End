import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "items/";
export const getAllItems = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_ITEMS,
        payload: { items: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addItem = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.ADD_ITEM,
        payload: { item: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateItem = (data) => (dispatch) => {
  axios
    .put(
      apiEndPoint + data.itemId,
      {
        ...data,
        name: data.name,
        itemClass: data.itemClass,
        description: data.description,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_ITEM,
        payload: {
          item: response.data,
        },
      })
    )
    .catch((err) => console.log(err));
};

export const searchItems = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_ITEMS,
        payload: { items: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(apiEndPoint + itemId)
    .then((response) => {
      dispatch({
        type: actions.DELETE_ITEM,
        payload: { item: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const countItem = (data) => {
  return (dispatch) => {
    axios
      .post(apiEndPoint + "/count", data)
      .then((response) => {
        dispatch({
          type: actions.COUTN_ITEM,
          payload: { count: response.data },
        });
      })
      .catch((err) => console.log(err.message));
  };
};

export const getPFS = (data) => {
  return (dispatch) => {
    axios
      .post(apiEndPoint + "/pfs", data)
      .then((response) => {
        // console.log("response.data", response.data);
        dispatch({
          type: actions.GET_PFS_ITEM,
          items: response.data,
        });
      })
      .catch((err) => console.log(err.message));
  };
};
