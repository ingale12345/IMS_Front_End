import * as actions from "../actions/actionTypes";
export const selectedOrderReducer = (state = { selectedOrder: {} }, action) => {
  switch (action.type) {
    case actions.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: action.selectedOrder };
    default:
      return { ...state };
  }
};
