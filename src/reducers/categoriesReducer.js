import * as actions from "../actions/actionTypes";
export const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case actions.ADD_CATEGORY:
      const newArry = [...state.categories];
      newArry.push(action.payload.category);
      return { ...state, categories: newArry };
    case actions.DELETE_CATEGORY:
      const newCategories = state.categories.filter(
        (c) => c._id !== action.payload.category._id
      );
      return { ...state, categories: newCategories };
    case actions.UPDATE_CATEGORY:
      const updatedCategories = state.categories.map((c) => {
        if (c._id === action.payload.category._id) {
          c = action.payload.category;
        }
        return c;
      });
      return { ...state, categories: updatedCategories };
    default:
      return { ...state };
  }
};
