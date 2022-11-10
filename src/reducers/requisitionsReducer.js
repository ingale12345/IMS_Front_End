import * as actions from "../actions/actionTypes";
import { updateRequisition } from "../actions/requisitionsAction";
export const requisitionsReducer = (state = { requisitions: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_REQUISITIONS:
      return { ...state, requisitions: action.payload.requisitions };
    case actions.GET_REQUISITIONS_BY_SHOP:
      return { ...state, requisitions: action.payload.requisitions };
    case actions.UPDATE_REQUISITION:
      const updatedRequisitions = state.requisitions.map((req) => {
        if (req._id === action.payload.requisition._id) {
          return action.payload.requisition;
        }
        return req;
      });
      return { ...state, requisitions: updatedRequisitions };
    case actions.ADD_REQUISITION:
      const newRequsitions = [...state.requisitions];
      newRequsitions.push(action.payload.requisition);

      return { ...state, requisitions: newRequsitions };
    case actions.DELETE_REQUISITION:
      const requisitionsAfterDelete = state.requisitions.filter(
        (r) => r._id !== action.payload.requisition._id
      );
      return { ...state, requisitions: requisitionsAfterDelete };
    case actions.UPDATE_REQUISITION_STATUS:
      const requisitionsStatusUpdated = state.requisitions.map((req) => {
        if (req._id === action.payload.requisition._id) {
          return action.payload.requisition;
        } else return req;
      });

      return { ...state, requisitions: requisitionsStatusUpdated };
    default:
      return { ...state };
  }
};
