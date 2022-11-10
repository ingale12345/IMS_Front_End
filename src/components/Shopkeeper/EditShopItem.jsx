import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateShopItemPrice,
  updateShopItemQuantity,
} from "../../actions/shopItemsAction";

function EditShopItem(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm({});

  const { setShowPopUp, item, shopId } = props;

  const shopItem = useSelector(
    (state) => state.shopItemsReducer.shopItems
  ).find((shopItem) => shopItem.shop === shopId && shopItem.item === item?._id);
  //   console.log(shopItem);
  useEffect(() => {
    reset();
    setValue("shopItemId", shopItem?._id);
    setValue("unit", shopItem?.availableQuantity.unit);
    setValue("price", shopItem?.price);
  }, []);
  useEffect(() => {
    setValue("shopItemId", shopItem?._id);
    setValue("unit", shopItem?.availableQuantity.unit);
    setValue("price", shopItem?.price);
  }, [shopItem]);

  const handlePriceChange = (data) => {
    delete data.amount;
    delete data.unit;
    dispatch(updateShopItemPrice(data));
    reset();
  };
  const handleUpdateQuantity = (data) => {
    delete data.price;
    const QtyData = {
      shopItemId: data.shopItemId,
      quantityAddition: {
        amount: data.amount,
        unit: data.unit,
        addedBy: jwtDecode(token)._id,
      },
    };
    dispatch(updateShopItemQuantity(QtyData));
    reset();
  };

  return !item || !shopItem ? (
    ""
  ) : (
    <div className="w-1/2 h-1/2 select-none bg-white font-nunito rounded-2xl overflow-clip flex flex-col">
      <div className="flex justify-between border-b-2 py-2 px-6">
        <span className="font-bold uppercase">Edit Shop Item</span>
        <AiOutlineCloseCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowPopUp(false);
          }}
        />
      </div>
      <div className="flex h-full flex-row">
        <div className="w-full h-full border-r-2 gap-5 flex flex-col items-center">
          <span className="font-semibold">Change Shop Item Price</span>
          <div className="flex gap-2">
            <span className="text-[#57B2BA]">{item.name}</span>
            <span>Price : &#8377; {shopItem.price}</span>
          </div>
          <form
            onSubmit={handleSubmit(handlePriceChange)}
            className="flex flex-col gap-6 items-center"
          >
            <div className="flex gap-2">
              <span>&#8377;</span>
              <input
                {...register("price")}
                type="text"
                className="border-2 px-3 rounded-lg"
                placeholder="Price"
              />
            </div>
            <button
              type="submit"
              className="border-2 py-1 px-5 rounded-2xl bg-sky-500 text-white"
            >
              Update Price
            </button>
          </form>
        </div>
        <div className="w-full h-full flex gap-5 flex-col items-center">
          <span className="font-semibold">Quantity Addition</span>
          <span>
            Available Quantity : {shopItem.availableQuantity.amount}
            <span>{shopItem.availableQuantity.unit}</span>
          </span>
          <form
            onSubmit={handleSubmit(handleUpdateQuantity)}
            className="w-full h-full flex gap-5 flex-col items-center"
          >
            <div>
              <input
                {...register("amount")}
                type="text"
                className="border-2 px-3 rounded-lg"
                placeholder="Quantity"
              />
              {shopItem.availableQuantity.amount === 0 ? (
                <select {...register("unit")} className="cursor-pointer">
                  <option>Unit</option>
                  <option value="kg">kg</option>
                  <option value="ltr">ltr</option>
                  <option value="piece">piece</option>
                </select>
              ) : (
                <span className="text-lg ml-3">
                  {shopItem.availableQuantity.unit}
                </span>
              )}
            </div>
            <button
              type="submit"
              onClick={() => {}}
              className="border-2 py-1 px-5 rounded-2xl bg-sky-500 text-white"
            >
              Add Quantity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditShopItem;
