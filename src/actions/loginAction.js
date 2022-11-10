import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL;

export const userLogin = (user) => (dispatch) => {
  toast
    .promise(axios.post(apiEndPoint + "login", user), {
      pending: "Login Processing...",
      error: "Username or Password is Invalid",
    })
    .then((response) => {
      sessionStorage.setItem("token", response.data);
      dispatch({
        type: actions.USER_LOGIN,
        payload: { token: response.data },
      });
    })
    .catch((error) => {
      // const loginFailed = (msg) => toast.error(msg);
      // loginFailed(error.response.data);
      // console.log(error);
    });
};

export const userLogout = () => (dispatch) => {
  const logoutMessage = () =>
    toast.success("Logout Successfully", { autoClose: 2000 });
  sessionStorage.setItem("token", "");
  dispatch({ type: actions.USER_LOGOUT, payload: { token: "" } });
  logoutMessage();
};
export const loadLogin = () => ({
  type: actions.USER_LOGIN,
  payload: { token: sessionStorage.getItem("token") },
});
