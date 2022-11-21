import * as actions from "../actions/actionTypes";
export const usersReducer = (state = { users: [], count: 0 }, action) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return { ...state, users: action.payload.users };
    case actions.ADD_USER:
      const newArry = [...state.users];
      newArry.push(action.payload.user);
      return { ...state, users: newArry };
    case actions.DELETE_USER:
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload.user._id
      );
      return { ...state, users: newUsers };
    case actions.UPDATE_USER:
      const updatedUsers = state.users.map((user) => {
        if (user._id === action.payload.user._id) {
          user = action.payload.user;
        }
        return user;
      });
      return { ...state, users: updatedUsers };
    case actions.UPDATE_USER_PROFILE:
      const updatedProfileUsers = state.users.map((user) => {
        if (user._id === action.payload.user._id) {
          user = action.payload.user;
        }
        return user;
      });
      return { ...state, users: updatedProfileUsers };

    case actions.COUNT_USER:
      return {
        ...state,
        count: +action.payload.count,
      };
    case actions.GET_PFS_USER:
      return {
        ...state,
        users: action.users,
      };
    default:
      return { ...state };
  }
};
