import React, { useEffect } from "react";
import "./navbar.css";
import inventoryImage from "../../images/shoppingCart.PNG";
import profileImage from "../../images/profileImage.jpg";
import { Link } from "react-router-dom";
import demoprofileimage from "../../images/demoprofileimage.png";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import menus from "../../services/roleMenu.json";
import { useState } from "react";
import UserInfoForm from "./UserInfoForm";
import EditUserForm from "../common/EditUserForm";

function Navbar() {
  const [image, setImage] = useState(demoprofileimage);
  const token = useSelector((state) => state.loginReducer.token);
  const decode = jwt_decode(token);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const user = useSelector((state) => state.usersReducer.users).find(
    (user) => user._id === decode._id
  );
  const ul = (index) => {
    var underlines = document.querySelectorAll(".underline");

    for (var i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  };
  useEffect(() => {
    if (user?.profile) {
      function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const data = _arrayBufferToBase64(user?.profile.image.data);
      setTimeout(() => {
        setImage(`data:${user.profile?.mimetype};base64,` + data);
      }, 100);
      // const img = `data:${user.profile?.mimetype};base64,` + data;
    }
  }, [user]);
  return (
    <div
      className=" flex justify-between "
      style={{ borderBottom: "#BABABA solid 2px" }}
    >
      <div className="navbar flex   w-full ">
        <div
          id="image"
          className="w-56 h-full flex justify-center items-center"
        >
          <div
            style={{
              backgroundImage: `url(${inventoryImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-12 ml-3 mt-6 h-full bg-contain"
          ></div>
          <div className="ml-2 mt-6">
            <span className="font-bold text-sm text-[#57B2BA]">INVENTORY</span>
            <span className="font-bold text-sm text-[#5046AF]">APP</span>
          </div>
        </div>

        <div className="w-full  h-full block">
          <nav className=" black h-full flex">
            <div className="underline bg-[#57B2BA]"></div>

            {(decode.role === "admin"
              ? menus.admin
              : decode.role === "customer"
              ? menus.customer
              : menus.shopkeeper
            ).map((menu, index) => {
              return (
                <Link
                  key={index}
                  className="a-link"
                  to={menu.path}
                  onClick={() => ul(index)}
                >
                  {menu.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className=" w-56 h-full flex  items-center">
        <div className="flex flex-col  items-end">
          <span className="text-purple-700 text-sm font-medium">
            {decode.name}
          </span>
          <span className="text-sm italic">{decode.role}</span>
        </div>
        <div
          className=" ml-2 rounded-full h-10 w-10 overflow-clip cursor-pointer"
          onClick={() => {
            setShowPopUp((prev) => !prev);
            setShowEditForm(false);
          }}
        >
          <img
            src={image}
            alt="profile Image"
            className="object-cover  h-10 w-10"
          />
        </div>
        <div
          className={`w-[600px] h-[575px] flex justify-center  items-center  absolute top-20 left-[760px]   bg-[#F6F6F6] ${
            showPopUp ? "block" : "hidden"
          }`}
          style={{ zIndex: 1 }}
        >
          <UserInfoForm
            setShowEditForm={setShowEditForm}
            token={token}
            setShowPopUp={setShowPopUp}
          />
        </div>
        <div
          className={`w-full h-full flex justify-center  items-center  absolute top-0 left-0   bg-[#F6F6F6] ${
            showEditForm ? "block" : "hidden"
          }`}
          style={{ zIndex: 1 }}
        >
          <EditUserForm setShowEditForm={setShowEditForm} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
