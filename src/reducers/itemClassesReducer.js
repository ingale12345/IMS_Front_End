import * as actions from "../actions/actionTypes";
export const itemClassesReducer = (state = { itemClasses: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_ITEM_CLASSES:
      return { ...state, itemClasses: action.payload.itemClasses };
    case actions.ADD_ITEM_CLASS:
      const newArray = [...state.itemClasses];
      newArray.push(action.payload.itemClass);
      return { ...state, itemClasses: newArray };
    case actions.DELETE_ITEM_CLASS:
      const itemClassesAfterDelete = state.itemClasses.filter(
        (ic) => ic._id !== action.payload.itemClass._id
      );
      return { ...state, itemClasses: itemClassesAfterDelete };
    case actions.UPDATE_ITEM_CLASS:
      const updatedItemClasses = state.itemClasses.map((itc) => {
        if (itc._id === action.payload.itemClass._id) {
          itc = action.payload.itemClass;
        }
        return itc;
      });
      return {
        ...state,
        itemClasses: updatedItemClasses,
      };
    default:
      return { ...state };
  }
};
