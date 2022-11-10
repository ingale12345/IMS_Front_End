import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "categories/";
export const getAllCategories = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: actions.GET_ALL_CATEGORIES,
        payload: { categories: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addCategory = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: actions.ADD_CATEGORY,
        payload: { category: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateCategory = (data) => (dispatch) => {
  axios
    .put(
      apiEndPoint + data.categoryId,
      { name: data.name, ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      dispatch({
        type: actions.UPDATE_CATEGORY,
        payload: { category: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const searchCategories = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_CATEGORIES,
        payload: { categories: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId) => (dispatch) => {
  axios
    .delete(apiEndPoint + categoryId)
    .then((response) => {
      dispatch({
        type: actions.DELETE_CATEGORY,
        payload: { category: response.data },
      });
    })
    .catch((err) => console.log(err));
};
