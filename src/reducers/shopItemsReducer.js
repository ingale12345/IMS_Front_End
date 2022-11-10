import * as actions from "../actions/actionTypes";
export const shopItemsReducer = (state = { shopItems: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_SHOP_ITEMS:
      return { ...state, shopItems: action.payload.shopItems };
    case actions.ADD_SHOP_ITEM:
      const newArray = [...state.shopItems];
      newArray.push(action.payload.shopItem);
      return { ...state, shopItems: newArray };
    case actions.UPDATE_SHOP_ITEM_QUANTITY:
      const updatedShopItems = state.shopItems.map((shopItem) => {
        if (shopItem._id === action.payload.shopItem._id) {
          shopItem = action.payload.shopItem;
        }
        return shopItem;
      });
      return { ...state, shopItems: updatedShopItems };
    case actions.UPDATE_SHOP_ITEM_PRICE:
      const updatedPriceShopItems = state.shopItems.map((shopItem) => {
        if (shopItem._id === action.payload.shopItem._id) {
          shopItem = action.payload.shopItem;
        }
        return shopItem;
      });
      return { ...state, shopItems: updatedPriceShopItems };

    case actions.DELETE_SHOP_ITEM:
      const shopItemsAfterDelete = state.shopItems.filter(
        (shopItem) => shopItem._id !== action.payload.shopItem._id
      );
      return { ...state, shopItems: shopItemsAfterDelete };

    default:
      return { ...state };
  }
};
