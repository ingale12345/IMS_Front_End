import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { shopsReducer } from "./shopsReducer";
import { categoriesReducer } from "./categoriesReducer";
import { itemClassesReducer } from "./itemClassesReducer";
import { itemsReducer } from "./itemsReducers";
import { shopItemsReducer } from "./shopItemsReducer";
import { requisitionsReducer } from "./requisitionsReducer";
import { selectedOrderReducer } from "./selectOrderReducer";
import { usersReducer } from "./usersReducer";
import { otpReducer } from "./otpReducer";

export default combineReducers({
  loginReducer,
  shopsReducer,
  categoriesReducer,
  itemClassesReducer,
  itemsReducer,
  shopItemsReducer,
  requisitionsReducer,
  usersReducer,
  selectedOrderReducer,
  otpReducer,
});
