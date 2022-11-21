import * as actions from "../actions/actionTypes";
const initialState = {
  shops: [],
  categoriesOfShops: [],
  shopsByCategory: [],
  shopData: [],
};
export const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_SHOPS:
      return { ...state, shops: action.payload.shops };
    case actions.ADD_SHOP:
      const newArray = [...state.shops];
      newArray.push(action.payload.shop);
      return { ...state, shops: newArray };

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

    //Changes

    case actions.GET_ALL_CATEGORIES_OF_SHOPS:
      return { ...state, categoriesOfShops: action.payload.categoriesOfShops };

    case actions.GET_All_SHOPS_BY_CATEGORY:
      return { ...state, shopsByCategory: action.payload.shopsByCategory };

    case actions.GET_SHOP_DATA:
      return { ...state, shopData: action.payload.shopData };
    default:
      return { ...state };
  }
};
