import inventoryImage from "../images/inventory.JPG";
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import firstImage from "../images/mast.jpg";
import { userLogin } from "../actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./common/ForgotPassword";

const schema = yup.object().shape({
  email: yup.string().required("Email is required field").email(),
  password: yup.string().required("Password is Required").min(8).max(32),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const token = useSelector((state) => state.loginReducer.token);
  const SuccessfullLoginMessage = () =>
    toast.success("Login Successfull", {
      autoClose: 2000,
    });
  const LoginErrorMessage = () =>
    toast.error("You are not an Active user. ! Please Contact administrator", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);
      if (decode.isActive) {
        navigate("/dashboard");
        // SuccessfullLoginMessage();
      } else {
        LoginErrorMessage();
      }
    }
  }, [token]);
  const onSubmitHandler = (data) => {
    console.log({ data });
    dispatch(userLogin(data));
    reset();
  };
  return (
    <div className="flex justify-center   items-center h-screen bg-gradient-to-r from-[#8ED89E] via-[#5DBFB0] to-[#58B4B9]">
      <div
        className={`w-full h-screen p-10   absolute flex justify-center items-center top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
        style={{
          zIndex: "1",
        }}
      >
        <RegisterForm showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      </div>
      <div
        className={`w-full h-screen p-10  absolute flex justify-center items-center top-0 left-0 bg-gray-500/60 ${
          forgotPasswordForm ? "block" : "hidden"
        }`}
        style={{
          zIndex: "1",
        }}
      >
        <ForgotPassword
          forgotPasswordForm={forgotPasswordForm}
          setForgotPasswordForm={setForgotPasswordForm}
        />
      </div>

      <div className="h-[85%] w-[75%] bg-white   shadow-slate-600 rounded-md drop-shadow-[0_2px_10px_#333] bg-center bg-cover">
        <div className="w-full h-20 flex justify-between items-center">
          <div
            style={{
              backgroundImage: `url(${inventoryImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className=" w-48 h-full bg-contain"
          ></div>
          <div className="mx-10 w-32 flex justify-between xs:text-xs sm:text-sm">
            <Link
              to="/"
              className="italic font-bold text-black  hover:text-green-500"
            >
              ABOUT US
            </Link>
            <Link
              href="/login"
              className="font-bold italic cursor-not-allowed text-[#59B6BC]"
            >
              LOGIN
            </Link>
          </div>
        </div>
        <div className="w-full h-[86%] flex justify-center ">
          <div
            style={{
              boxShadow: "0 10px 30px grey",
              gridTemplateRows: "40% 60%",
            }}
            className="w-[32%] h-[95%] bg-[#58B4B9] rounded-xl grid grid-rows-2 "
          >
            <div className="my-2 flex-col  text-white items-center justify-center">
              <div
                style={{
                  margin: "0 25%",
                }}
                className="font-bold text-3xl"
              >
                WELCOME
              </div>

              <div className=" mx-5 my-4">
                Inventory Management System (IMS)
              </div>

              <div className="text-sm  mx-5 my-4 text-center">
                is highly flexible and configurable web application to help
                shopkeepers to manage their inventory
              </div>
            </div>
            <div className="bg-white rounded-b-xl flex justify-center items-center">
              <div id="login-form" className=" w-48 h-full">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="rounded-full w-full my-4 h-10 flex justify-between border-2 border-[#707070] pl-2 items-center ">
                    <AiOutlineUser size={20} className="text-[#707070] ml-2" />
                    <input
                      {...register("email")}
                      className="w-4/5 rounded-r-full h-full border-0 outline-none"
                      placeholder="username"
                      type="email"
                      required
                    />
                  </div>
                  <p>{errors.email?.message}</p>
                  <div className="rounded-full w-full my-4 h-10 flex justify-between border-2 border-[#707070] pl-2 items-center ">
                    <IoLockClosedOutline
                      size={20}
                      className="text-[#707070] ml-2"
                    />

                    {/* <HiOutlineLockClosed
                      size={20}
                      className="text-[#707070] ml-2"
                    /> */}

                    <input
                      {...register("password")}
                      className="w-4/5 rounded-r-full h-full border-0 outline-none"
                      placeholder="password"
                      type="password"
                      required
                    />
                  </div>
                  <p>{errors.password?.message}</p>
                  <input
                    className="w-full h-10 rounded-xl text-white text-sm font-bold cursor-pointer  bg-[#58B4B9] hover:bg-[#448c90]"
                    placeholder="password"
                    type="submit"
                    value={"LOGIN"}
                  />
                </form>
                <div
                  onClick={() => {
                    setShowPopUp((prev) => !prev);
                  }}
                  className=" block pt-2 text-center cursor-pointer text-[#5046AF] font-bold text-sm"
                >
                  Create Account
                </div>

                <Link
                  className=" block pt-8 text-center text-[#5046AF] font-bold text-sm"
                  to={"#"}
                  onClick={() => {
                    setForgotPasswordForm((prev) => !prev);
                  }}
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
