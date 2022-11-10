import { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import ShopItemForm from "./ShopItemForm";

function RequisitionSubMenu(props) {
  const { btnName, searchData, shopId } = props;

  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div
      style={{
        gridTemplateColumns: "20% 80%",
      }}
      className="border-0 grid border-b-2"
    >
      <div className="flex justify-start items-center pl-8  border-r-2 font-bold text-black font-nunito ">
        Filter
      </div>

      <div className="  py-4 ">
        <div className="flex ml-10 w-2/5 items-center rounded-full border-2 border-gray-500 overflow-clip">
          <BiSearch className="ml-3" />
          <input
            type="text"
            placeholder="Search"
            className="p-[2px] text-sm placeholder:text-sm pl-3 w-full outline-none focus:border-sky-300 border-solid-black "
            onChange={(e) => searchData(e.target.value)}
          />
          <BiX className="mr-3 text-xl cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {btnName ? (
          <button
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            className="border-2 px-3 py-1 bg-[#57B2BA] text-white rounded-full border-black"
          >
            {btnName}
          </button>
        ) : (
          ""
        )}
      </div>
      <div
        className={`w-full h-screen absolute top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
      >
        {btnName === "Add Shop Item" ? (
          <ShopItemForm
            shopId={shopId}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
          />
        ) : btnName === "Add Item Class" ? (
          "<ItemClassForm showPopUp={showPopUp} setShowPopUp={setShowPopUp} />"
        ) : btnName === "Add Item" ? (
          " <ItemForm showPopUp={showPopUp} setShowPopUp={setShowPopUp} />"
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RequisitionSubMenu;
