import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "users/";

export const registerUser = (data) => (dispatch) => {
  toast
    .promise(
      axios.post(apiEndPoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        success: "Registration Successfully Completed",
        pending: "Register Processing...",
        error: "You cannot register with the same email id",
      }
    )
    .then((response) => {
      console.log(response.data);
      dispatch({ type: actions.ADD_USER, payload: { user: response.data } });
    })
    .catch((err) => console.log(err));
};

export const generateOTP = (email) => (dispatch) => {
  axios
    .post(apiEndPoint + "generateOTP", { email })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.GENERATE_OTP,
        payload: {
          email: response.data.email,
          otpStatus: response.data.otpStatus,
        },
      });
    })
    .catch((err) => console.log(err));
};
export const validateOTP = (email, otp) => (dispatch) => {
  axios
    .post(apiEndPoint + "validateOTP", { email, otp })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.GENERATE_OTP,
        payload: {
          email: response.data.email,
          otpStatus: response.data.otpStatus,
        },
      });
    })
    .catch((err) => console.log(err));
};
export const changePassword = (email, password) => (dispatch) => {
  axios
    .patch(apiEndPoint + "changePassword/", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.GENERATE_OTP,
        payload: {
          email: response.data.email,
          otpStatus: response.data.otpStatus,
        },
      });
    })
    .catch((err) => console.log(err));
};

export const updateUserProfile = (data) => (dispatch) => {
  axios
    .patch(apiEndPoint + data.userId, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      dispatch({
        type: actions.UPDATE_USER_PROFILE,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err));
};
export const getAllUsers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: { users: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const updateUser = (data) => (dispatch) => {
  axios
    .put(apiEndPoint + data.userId, data)
    .then((response) => {
      dispatch({
        type: actions.UPDATE_USER,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const searchUsers = (searchValue) => (dispatch) => {
  axios
    .post(apiEndPoint + "search", { searchValue })
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: { users: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (userId) => (dispatch) => {
  axios
    .delete(apiEndPoint + userId)
    .then((response) => {
      dispatch({
        type: actions.DELETE_USER,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err));
};
