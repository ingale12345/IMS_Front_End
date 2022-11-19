import logo from "./logo.svg";
import "./App.css";
import InventoryApp from "./components/inventoryApp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLogin } from "./actions/loginAction";
import { Outlet } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, []);
  return (
    <div className="select-none">
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
