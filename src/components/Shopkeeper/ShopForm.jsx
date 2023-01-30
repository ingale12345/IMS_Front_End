import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllCategories } from "../../actions/categoriesAction";
import { addShop, updateShop } from "../../actions/shopAction";
import IndianState from "../../services/IndianStates";
function ShopForm(props) {
  const { showPopUp, setShowPopUp, shop } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm({});
  useEffect(() => {
    dispatch(getAllCategories());
    if (shop) {
      setValue("_id", shop._id);
      setValue("shop_name", shop.name);
      setValue("category", shop.category);
      setValue("addressLine1", shop.addressLine1);
      setValue("addressLine2", shop.addressLine2);
      setValue("area", shop.area);
      setValue("city", shop.city);
      setValue("state", shop.state);
      setValue("zipcode", shop.zipcode);
      setValue("contactPersonName", shop.contactPerson.name);
      setValue("phone", shop.contactPerson.phone);
    }
  }, []);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const token = useSelector((state) => state.loginReducer.token);
  const onSubmitHandler = (data) => {
    if (data._id) {
      const shop = {
        _id: data._id,
        name: data.shop_name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        area: data.area,
        city: data.city,
        owner: jwtDecode(token)._id,
        state: data.state,
        zipcode: data.zipcode,
        category: data.category,
        contactPerson: {
          name: data.contactPersonName,
          phone: data.phone,
        },
      };

      dispatch(updateShop(shop));
    } else {
      const shop = {
        name: data.shop_name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        area: data.area,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        category: data.category,
        owner: jwtDecode(token)._id,
        contactPerson: {
          name: data.contactPersonName,
          phone: data.phone,
        },
      };
      reset();
      dispatch(addShop(shop));
    }
    setShowPopUp(false);
  };
  return (
    <div className="w-full h-7/8 overflow-y-auto  flex justify-center my-8">
      <div className=" border-2 w-1/3 overflow-y-auto rounded-2xl bg-white shadow">
        <div className="border-b-2 p-4 flex justify-between ">
          <h6 className="mx-3">ADD SHOP</h6>
          <AiOutlineCloseCircle
            className="text-2xl cursor-pointer"
            onClick={() => {
              setShowPopUp(false);
            }}
          />
        </div>
        <div>
          <form
            className="flex flex-col gap-2 p-3"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <input
              {...register("shop_name")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="Shop Name"
            />

            <p>{errors.shop_name?.message}</p>

            <select
              className="border-2 w-full  rounded-md"
              placeholder="Shop Name"
              {...register("category")}
            >
              <option value="">Select Categories</option>
              {categories.map((c) => (
                <option value={c._id} id={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              {...register("addressLine1")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="AddressLine1"
            />

            <p>{errors.addressLine1?.message}</p>
            <input
              {...register("addressLine2")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="AddressLine2"
            />

            <p>{errors.addressLine2?.message}</p>
            <input
              {...register("area")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="Area"
            />

            <p>{errors.area?.message}</p>
            <input
              {...register("city")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="City"
            />

            <p>{errors.city?.message}</p>
            {/* <input
              {...register("state")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="State"
            /> */}
            <select
              className="border-2  w-full  rounded-md flex"
              {...register("state")}
              name="state"
              id="state"
            >
              <option value={""}>Select State</option>
              {IndianState.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <p>{errors.state?.message}</p>
            <input
              {...register("zipcode")}
              maxLength={6}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="Zip Code"
            />

            <p>{errors.shop_name?.message}</p>
            <input
              {...register("contactPersonName")}
              type="text"
              className="border-2  w-full  rounded-md flex"
              placeholder="Contact Person Name"
            />

            <p>{errors.shop_name?.message}</p>
            <input
              {...register("phone")}
              type="text"
              maxLength={10}
              className="border-2  w-full  rounded-md flex"
              placeholder="Contact Person Phone"
            />
            <p>{errors.phone?.message}</p>
            <div className="flex justify-end m-4">
              <button
                type="button"
                onClick={() => setShowPopUp(false)}
                className="mx-2 border-2 p-1 w-28 rounded-2xl text-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mx-2 border-2 p-1 w-28 rounded-2xl bg-cyan-300 text-white"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShopForm;
