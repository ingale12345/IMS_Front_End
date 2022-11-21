import * as actions from "../actions/actionTypes";
export const categoriesReducer = (
  state = { categories: [], count: 0 },
  action
) => {
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

    case actions.COUNT_CATEGORY:
      // console.log(action.payload.count);
      return {
        ...state,
        count: +action.payload.count,
      };

    case actions.GET_PFS_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return { ...state };
  }
};
