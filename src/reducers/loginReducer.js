import * as actions from "../actions/actionTypes";
export const loginReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      // console.log(action.payload.token);
      return { ...state, token: action.payload.token };
    case actions.USER_LOGOUT:
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
};
