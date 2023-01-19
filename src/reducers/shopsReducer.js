import * as actions from "../actions/actionTypes";
const initialState = { shops: [], count: 0, shop: {} };
export const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_SHOPS:
      return { ...state, shops: action.payload.shops };
    case actions.COUNT_SHOPS:
      return { ...state, count: +action.payload.count };
    case actions.ADD_SHOP:
      const newArray = [...state.shops];
      newArray.push(action.payload.shop);
      return { ...state, shops: newArray };
    case actions.GET_SHOP_BY_ID:
      return { ...state, shop: action.payload.shop };
    case actions.UPDATE_SHOP:
      const updatedshops = state.shops.map((shop) => {
        if (shop._id === action.payload.shop._id) {
          shop = action.payload.shop;
        }
        return shop;
      });
      return { ...state, shops: updatedshops };

    case actions.DELETE_SHOP:
      const shopsAfterDelete = state.shops.filter(
        (shop) => shop._id !== action.payload.shop._id
      );
      return { ...state, shops: shopsAfterDelete };

    default:
      return { ...state };
  }
};
