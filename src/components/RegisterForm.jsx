import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../actions/userAction";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  userName: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().required(),
});
function RegisterForm(props) {
  const dispatch = useDispatch();
  const { setShowPopUp } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    data = {
      ...data,
      email: data.email.toLowerCase(),
      profile: data.profile["0"],
    };
    dispatch(registerUser(data));
    reset();
    setShowPopUp(false);
  };
  return (
    <div className="w-2/5 flex flex-col rounded-2xl gap-4 overflow-clip h-full   bg-white ">
      <div className="w-full flex justify-between items-center border-b-2  p-3">
        <span className="text-lg font-bold font-nunito">Register</span>
        <AiOutlineCloseCircle
          onClick={() => {
            setShowPopUp((prev) => !prev);
          }}
          className="text-3xl cursor-pointer"
        />
      </div>
      <form
        encType="multipart/form-data"
        className="px-12 gap-3 flex flex-col"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className=" gap-2 flex flex-col">
          <div className="h-12">
            <input
              {...register("firstName")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="text"
              placeholder="First Name"
            />
            <p>{errors.firstName?.message}</p>
          </div>
          <div className="h-12">
            <input
              {...register("lastName")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="text"
              placeholder="Last Name"
            />
            <p>{errors.lastName?.message}</p>
          </div>
          <div className="h-12">
            <input
              {...register("email")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="email"
              placeholder="Email"
            />
            <p>{errors.email?.message}</p>
          </div>

          <div className="h-12">
            <input
              {...register("phone")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="text"
              placeholder="Phone"
              maxLength={10}
            />
            <p>{errors.phone?.message}</p>
          </div>
          <div className="h-12">
            <input
              {...register("userName")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="text"
              placeholder="User Name"
            />
            <p>{errors.userName?.message}</p>
          </div>
          <div className="h-12">
            <input
              {...register("password")}
              className="h-8 w-full  rounded-md pl-3 border-gray-500 border-2"
              type="password"
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>
          </div>
          <div className="flex justify-between px-8 font-nunito font-bold">
            <span className="">Role</span>
            <span className="flex gap-2">
              <input
                {...register("role")}
                defaultChecked
                type="radio"
                name="role"
                value={"customer"}
              />
              <label htmlFor="role">Customer</label>
            </span>
            <span className="flex gap-2">
              <input
                {...register("role")}
                type="radio"
                name="role"
                value={"shopkeeper"}
              />
              <label htmlFor="role">Shopkeeper</label>
            </span>
            <p>{errors.role?.message}</p>
          </div>
          <div className="flex items-center justify-center">
            <input {...register("profile")} type="file" name="profile" id="" />
          </div>
        </div>

        <div className="flex mx-12 rounded-md overflow-clip bg-[#57B2BA]">
          <input
            className="h-8 w-full font-bold font-nunito rounded-md pl-3 cursor-pointer border-gray-500 border-2"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
