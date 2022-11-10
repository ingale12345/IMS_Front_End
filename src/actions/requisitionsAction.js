import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "requisitions/";
export const getAllRequisitions = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_REQUISITIONS,
        payload: { requisitions: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const getRequisitionByShop = (shopId, searchValue) => (dispatch) => {
  axios
    .put(apiEndPoint + "shop/" + shopId, { searchValue })
    .then((response) => {
      // console.log(response.data);
      dispatch({
        type: actions.GET_REQUISITIONS_BY_SHOP,
        payload: { requisitions: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateRequisition = (data) => (dispatch) => {
  //   console.log(data);
  axios.put(apiEndPoint + data.reqId, data).then((response) => {
    dispatch({
      type: actions.UPDATE_REQUISITION,
      payload: { requisition: response.data },
    });
  });
};
export const addRequisition = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data)
    .then((response) => {
      //   console.log(response.data);
      if (response.data === null) {
        return;
      }
      dispatch({
        type: actions.ADD_REQUISITION,
        payload: { requisition: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteRequisition = (requisitionId) => (dispatch) => {
  axios.delete(apiEndPoint + requisitionId).then((response) => {
    dispatch({
      type: actions.DELETE_REQUISITION,
      payload: { requisition: response.data },
    });
  });
};

export const requisitionsFilterByStatus = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.GET_ALL_REQUISITIONS,
        payload: { requisitions: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateRequisitionStatus = (requisitionId, data) => (dispatch) => {
  axios
    .patch(apiEndPoint + requisitionId, data)
    .then((response) => {
      dispatch({
        type: actions.UPDATE_REQUISITION_STATUS,
        payload: { requisition: response.data },
      });
    })
    .catch((err) => console.log(err));
};
