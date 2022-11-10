import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRouter from "./components/common/ProtectedRouter";
import InventoryApp from "./components/inventoryApp";
import FirstPageRouter from "./components/common/FirstPageRouter";
import Shops from "./components/Shops";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
// import Register from "./components/common/Register";
import Categories from "./components/Admin/Categories";
import ItemClasses from "./components/Admin/ItemClasses";
import Items from "./components/Admin/Items";
import Users from "./components/Admin/Users";
import ShopItems from "./components/Shopkeeper/ShopItems";
import Requisitions from "./components/Shopkeeper/Requisitions";
import ShopkeeperShops from "./components/Shopkeeper/ShopkeeperShops";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <InventoryApp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRouter>
            <Dashboard />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <FirstPageRouter></FirstPageRouter>,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "itemsClasses",
            element: <ItemClasses />,
          },
          {
            path: "items",
            element: <Items />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "shops",
            element: <Shops />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "shopItems",
            element: <ShopItems />,
          },
          {
            path: "requisitions",
            element: <Requisitions />,
          },
          {
            path: "shopkeeperShops",
            element: <ShopkeeperShops />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
