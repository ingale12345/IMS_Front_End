import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../../actions/categoriesAction";
import ShopForm from "./ShopForm";
// import EditUserForm from "./EditUserForm";

const Shop = (props) => {
  const { shop, onDelete } = props;
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const category = useSelector(
    (state) => state.categoriesReducer.categories
  ).find((category) => category._id === shop.category);

  return !category ? (
    ""
  ) : (
    <div className="rounded-xl bg-[#e7e5e5] h-10 flex px-4 ">
      <div
        className={`w-full h-screen p-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
        style={{
          zIndex: "1",
        }}
      >
        {/* <EditUserForm user={user} setShowPopUp={setShowPopUp} /> */}
        <ShopForm shop={shop} setShowPopUp={setShowPopUp} />
      </div>
      <div className="flex justify-start items-center  w-[500px]  ">
        <BsShop className="text-2xl text-[#888888] font-bold" />
        <span className="pl-3 text-[#9C9C9C]">Name : </span>
        <span className="pl-2 text-[#4E4C4C]">{shop.name}</span>
      </div>
      <div className="items-center flex w-80  text-[#9C9C9C] mx-6 ">
        Category : <span className="pl-1">{category.name}</span>
      </div>
      {/* <div className="flex justify-center items-center font-bold text-green-500 w-12">
        <span className="flex h-3 w-3 relative">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              true ? "bg-green-400" : "bg-red-500"
            } opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              false ? "bg-green-400" : "bg-red-500"
            }`}
          ></span>
        </span>
      </div> */}
      <div className="flex justify-between items-center  w-36 p-3 ml-40">
        <span className="bg-white p-1 rounded-full">
          <BiEdit
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            className="cursor-pointer text-xl text-[#5AB8C0]"
          />
        </span>
        <span className="bg-white p-1 rounded-full">
          <RiDeleteBin6Line
            className="cursor-pointer text-xl text-[#5AB8C0]"
            onClick={() => onDelete(shop._id)}
          />
        </span>
      </div>
    </div>
  );
};
export default Shop;
