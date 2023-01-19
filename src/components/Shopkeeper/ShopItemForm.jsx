import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import ItemList from "./ItemList";
import jwtDecode from "jwt-decode";
import { addShopItem } from "../../actions/shopItemsAction";
import { getShopById } from "../../actions/shopAction";
import { getItemClassesByShopCategory } from "../../actions/itemClassesAction";

function ShopItemForm(props) {
  const dispatch = useDispatch();
  const { showPopUp, setShowPopUp, shopId } = props;
  const [itemClass, setItemClass] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({}); //resolver: yupResolver(schema)

  const shop = useSelector((state) => state.shopsReducer.shop);
  let itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );
  const token = useSelector((state) => state.loginReducer.token);
  // if (shop) {
  //   itemClasses = itemClasses.filter(
  //     (itemClass) => itemClass.category === shop.category
  //   );
  // }

  //very IMP code

  useEffect(() => {
    dispatch(getShopById(shopId));
  }, [shopId]);

  useEffect(() => {
    if (itemClass === "")
      if (itemClasses.length != 0) {
        setItemClass(itemClasses[0]._id);
      }
  }, [itemClasses]);
  useEffect(() => {
    if (shopId === "") return;
    dispatch(getItemClassesByShopCategory(shopId));
  }, [shop]);

  // setTimeout(() => {
  //   if (itemClass === "") {
  //     if (itemClasses.length) {
  //       setItemClass(itemClasses[0]._id);
  //     }
  //   }
  // }, 500);
  const onSubmitHandler = (data) => {
    console.log(data);
    const decoded = jwtDecode(token);
    setItemClass(itemClasses[0]._id);
    if (typeof data.items === "string") {
      const sItem = {
        shop: shopId,
        item: data.items,
        price: 0,
        quantityAddition: {
          amount: 0,
          unit: "",
          addedBy: decoded._id,
        },
      };

      dispatch(addShopItem(sItem));
    }
    if (typeof data.items === "object") {
      data.items.forEach((item) => {
        const sItem = {
          shop: shopId,
          item: item,
          price: 0,
          quantityAddition: {
            amount: 0,
            unit: "",
            addedBy: decoded._id,
          },
        };

        dispatch(addShopItem(sItem));
      });
    }
    setShowPopUp(false);
    reset();
  };
  const handleSelectItemClass = (itemClassId) => {
    setItemClass(itemClassId);
  };
  return itemClasses.length === 0 ? (
    <div
      className={`w-1/5 h-1/5 rounded-3xl flex flex-col p-5 justify-center items-center overflow-clip absolute bg-white ${
        showPopUp ? "block" : "hidden"
      }`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <AiOutlineCloseCircle
        className="text-2xl cursor-pointer"
        onClick={() => {
          setShowPopUp((prev) => !prev);
        }}
      />
      <div className="text-sm">Item Classes Not Found </div>
      <div className="text-sm text-red-500">Please contact Administrator</div>
    </div>
  ) : (
    <div
      className={`w-2/5 h-3/5  rounded-3xl grid overflow-clip absolute bg-white ${
        showPopUp ? "block" : "hidden"
      }`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        gridTemplateRows: "15% 85%",
      }}
    >
      <div className="flex justify-between items-center p-5 border-b-2">
        <span className="font-bold font-nunito ">ADD SHOP ITEM</span>
        <AiOutlineCloseCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowPopUp((prev) => !prev);
          }}
        />
      </div>
      <div className="w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="p-5 gap-1 flex flex-col "
        >
          <select
            onChange={(e) => {
              handleSelectItemClass(e.target.value);
            }}
            className="border-2 border-gray-400 rounded-lg pl-4 w-full h-8 "
          >
            {/* <option value={""}>Select Item Type</option> */}
            {itemClasses.map((itemClass) => (
              <option key={itemClass._id} value={itemClass._id}>
                {itemClass.name}
              </option>
            ))}
          </select>
          <div className="mt-2 overflow-y-auto flex flex-col gap-2 w-full h-52">
            {shop ? (
              <ItemList
                itemClass={itemClass}
                register={register}
                shop={shop}
                setShowAddButton={setShowAddButton}
              />
            ) : (
              ""
            )}
            {/* {
            items.filter((item) => item.itemClass === itemClass).length ===
            0 ? (
              <div className="text-sm text-center text-red-600">
                Items not found for above Item Class
                <br />
                please contact administrator
              </div>
            ) : (
              <ItemList
                itemClass={itemClass}
                items={items}
                register={register}
                shop={shop}
              />
            )} */}
          </div>
          <div className="flex justify-end  mt-3">
            <span
              onClick={() => {
                setShowPopUp((prev) => !prev);
              }}
              className="p-1 border-2 w-32 text-center rounded-full cursor-pointer"
            >
              Cancel
            </span>
            {/* <button
              type="submit"
              className="p-1 border-2 w-32 bg-[#57B2BA] text-center rounded-full cursor-pointer ml-3"
            >
              Add
            </button> */}
            {!showAddButton ? (
              ""
            ) : (
              <button
                type="submit"
                className="p-1 border-2 w-32 bg-[#57B2BA] text-center rounded-full cursor-pointer ml-3"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopItemForm;
