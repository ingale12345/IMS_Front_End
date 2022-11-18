import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addCategory, updateCategory } from "../../actions/categoriesAction";
import { useEffect } from "react";
const schema = yup.object().shape({
  name: yup.string().required(),
});
function CategoryForm(props) {
  const dispatch = useDispatch();
  const { showPopUp, setShowPopUp, categoryId, categoryName } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    if (categoryId) {
      setValue("categoryId", categoryId);
      setValue("name", categoryName);
    }
  }, []);
  const onSubmitHandler = (data) => {
    // console.log(data.profile[0]);
    data = { ...data, profile: data.profile[0] };
    if (data.categoryId) {
      // console.log("demo");
      dispatch(updateCategory(data));
    } else {
      dispatch(addCategory(data));
    }
    setShowPopUp(false);
  };
  return (
    <div
      className={`w-2/5 h-2/5  rounded-3xl grid overflow-clip absolute bg-white ${
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
        <span className="font-bold font-nunito ">ADD CATEGORY</span>
        <AiOutlineCloseCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowPopUp((prev) => !prev);
          }}
        />
      </div>
      <div className="w-full">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmitHandler)}
          className="p-5 flex flex-col "
        >
          <input
            {...register("name")}
            type="text"
            className="w-full h-8 rounded-lg pl-4 border-2 border-gray-400 "
            placeholder="Category Name"
          />
          <span>{errors.name?.message}</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="bg-red-100 rounded-lg w-16 h-16"></div>
            <input
              {...register("profile")}
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
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

export default CategoryForm;
