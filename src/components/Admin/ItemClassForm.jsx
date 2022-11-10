import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect } from "react";
import { getAllCategories } from "../../actions/categoriesAction";
import { addItemClass, updateItemClass } from "../../actions/itemClassesAction";
const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string(),
});
function ItemClassForm(props) {
  const dispatch = useDispatch();
  const { showPopUp, setShowPopUp, itemClassId, itemClassName, categoryId } =
    props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    dispatch(getAllCategories());
    if (itemClassId) {
      setValue("itemClassId", itemClassId);
      setValue("name", itemClassName);
      setValue("category", categoryId);
    }
  }, []);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const onSubmitHandler = (data) => {
    data = { ...data, profile: data.profile[0] };
    if (data.itemClassId) {
      console.log(data);
      dispatch(updateItemClass(data));
    } else {
      dispatch(addItemClass(data));
    }
    setShowPopUp(false);
  };
  return (
    <div
      className={`w-2/5 h-3/5  rounded-3xl grid overflow-clip absolute bg-white ${
        showPopUp ? "block" : "hidden"
      }`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        gridTemplateRows: "30% 70%",
      }}
    >
      <div className="flex justify-between items-center p-5 border-b-2">
        <span className="font-bold font-nunito ">ADD Item Class</span>
        <AiOutlineCloseCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowPopUp((prev) => !prev);
          }}
        />
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="p-5 gap-2 flex flex-col "
        >
          <input
            {...register("name")}
            type="text"
            className="w-full h-8 rounded-lg pl-4 border-2 border-gray-400 "
            placeholder="itemClass Name"
          />
          <span>{errors.name?.message}</span>
          <select
            {...register("category")}
            className="border-2 border-gray-400 rounded-lg pl-4 w-full h-8 "
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-3 mt-2">
            <div className="bg-red-100 rounded-lg w-16 h-16"></div>
            <input {...register("profile")} type="file" />
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
            <button
              type="submit"
              className="p-1 border-2 w-32 bg-[#57B2BA] text-center rounded-full cursor-pointer ml-3"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemClassForm;
