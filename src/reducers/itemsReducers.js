import * as actions from "../actions/actionTypes";
export const itemsReducer = (state = { items: [], count: 0 }, action) => {
  switch (action.type) {
    case actions.GET_ALL_ITEMS:
      return { ...state, items: action.payload.items };
    case actions.ADD_ITEM:
      const newArray = [...state.items];
      newArray.push(action.payload.item);
      return { ...state, items: newArray };
    case actions.DELETE_ITEM:
      const itemsAfterDelete = state.items.filter(
        (item) => item._id !== action.payload.item._id
      );
      return { ...state, items: itemsAfterDelete };
    case actions.UPDATE_ITEM:
      const updatedItems = state.items.map((item) => {
        if (item._id === action.payload.item._id) {
          item = action.payload.item;
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
      };
    case actions.COUTN_ITEM:
      return {
        ...state,
        count: +action.payload.count,
      };
    case actions.GET_PFS_ITEM:
      return {
        ...state,
        items: action.items,
      };
    default:
      return { ...state };
  }
};
