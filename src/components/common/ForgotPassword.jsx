import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GENERATE_OTP } from "../../actions/actionTypes";
import {
  changePassword,
  generateOTP,
  validateOTP,
} from "../../actions/userAction";

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const { setForgotPasswordForm } = props;
  const [sec, setSec] = useState(60);
  const [interval, setMyInterval] = useState(null);
  const [sendOTP, setSendOTP] = useState(true);
  const [enterOTP, setEnterOTP] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [resetButton, setResetButton] = useState("");
  const otpStatus = useSelector((state) => state.otpReducer.otpStatus);
  const email = useSelector((state) => state.otpReducer.email);
  //   console.log(otpStatus);
  useEffect(() => {
    if (sec === 0) {
      dispatch({ type: GENERATE_OTP, payload: { email: "", otpStatus: "" } });
      setSendOTP(true);
      setEnterOTP(false);
      clearInterval(interval);
      setSec(60);
    }
  }, [sec]);

  useEffect(() => {
    if (otpStatus === "sent") {
      console.log("changed to sent");
      counter();
    }
    if (otpStatus === "Invalid Email") {
      dispatch({ type: GENERATE_OTP, payload: { email: "", otpStatus: "" } });
      const invalidEmail = () => toast.error(otpStatus, { autoClose: 1000 });
      invalidEmail();
    }
    if (otpStatus === "Invalid otp") {
      const invalidOTP = () => toast.error(otpStatus, { autoClose: 1000 });
      invalidOTP();
    }
    if (otpStatus === "verified") {
      setEnterOTP(false);
      setVerifyOTP(true);
      setSec(60);
      clearInterval(interval);
      dispatch({
        type: GENERATE_OTP,
        payload: { email: email, otpStatus: "" },
      });
      const validOTP = () => toast.success(otpStatus, { autoClose: 1000 });
      validOTP();
    }
    if (otpStatus === "passwordChanged") {
      dispatch({ type: GENERATE_OTP, payload: { email: "", otpStatus: "" } });
      const passwordChanged = () =>
        toast.success(
          "password changed Successfully .You can login with new password",
          { autoClose: 2000 }
        );
      passwordChanged();
      setForgotPasswordForm(false);
    }
  }, [otpStatus]);

  const counter = () => {
    setSendOTP(false);
    setEnterOTP(true);
    setMyInterval(
      setInterval(() => {
        setSec((prev) => prev - 1);
      }, 1000)
    );
  };

  return (
    <div className="w-1/3 h-40 bg-white rounded-xl overflow-clip flex flex-col">
      <div className="w-full flex justify-between items-center border-b-2  p-3">
        <span className="text-lg font-bold font-nunito">Forgot Password</span>
        <AiOutlineCloseCircle
          onClick={() => {
            setForgotPasswordForm(false);
          }}
          className="text-3xl cursor-pointer"
        />
      </div>
      <div
        className={`p-2 flex font-nunito ${
          sendOTP ? "block" : "hidden"
        } font-bold justify-around items center`}
      >
        <input
          className="border-2 outline-none rounded-lg px-2 placeholder:font-bold"
          type="email"
          placeholder="Email"
          name=""
          id="forgotPasswordEmail"
        />
        <button
          type="button"
          onClick={() => {
            dispatch(
              generateOTP(document.getElementById("forgotPasswordEmail").value)
            );
            // counter();
          }}
          className={`border-2  w-32 bg-green-400 rounded-md px-3 py-1`}
        >
          Send OTP
        </button>
      </div>
      <div
        className={`p-2 ${
          enterOTP ? "flex" : "hidden"
        }  font-nunito font-bold justify-around items center`}
      >
        <div className="flex flex-col items-center">
          <input
            className="border-2 outline-none rounded-lg px-2 placeholder:font-bold"
            type="text"
            placeholder="Enter OTP"
            id="otp"
          />
          <span className="text-sm text-red-400">
            remaining seconds:{Math.floor(+sec / 60)}: {+sec % 60}
          </span>
        </div>

        <button
          type="button"
          className="border-2  w-32 bg-green-400 rounded-md px-3 py-1"
          onClick={() => {
            dispatch(validateOTP(email, document.getElementById("otp").value));
            // counter();
          }}
        >
          Verify OTP
        </button>
      </div>

      <div
        className={`p-2 ${
          verifyOTP ? "flex" : "hidden"
        }  font-nunito font-bold justify-around items center`}
      >
        <div className="flex flex-col gap-2 items-center">
          <input
            className="border-2 outline-none rounded-lg px-2 placeholder:font-bold"
            type="password"
            placeholder="Enter New Password"
            id="password"
          />
          <input
            className="border-2 outline-none rounded-lg px-2 placeholder:font-bold"
            type="password"
            placeholder="Re-enter Password"
            id="newPassword"
            onChange={(e) => {
              let password = document.getElementById("password").value;
              if (password !== e.target.value) {
                document.getElementById("err_msg").innerText =
                  "password not matched";
                setResetButton("");
              } else {
                document.getElementById("err_msg").innerText = "";
                setResetButton("true");
              }
            }}
          />
          <p id="err_msg"></p>
        </div>

        <button
          type="button"
          disabled={resetButton ? false : true}
          className={`border-2 disabled:true w-32 ${
            resetButton ? "cursor-pointer" : "cursor-not-allowed"
          } bg-green-400 rounded-md px-3 py-1`}
          onClick={() => {
            let password = document.getElementById("password").value;
            password = password.trim();
            dispatch(changePassword(email, password));
          }}
        >
          Reset password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
