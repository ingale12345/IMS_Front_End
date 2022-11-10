import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import EditUserForm from "./EditUserForm";

const User = (props) => {
  const { user, onDelete } = props;
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div className="rounded-xl bg-[#FAFAFA] h-10 flex px-4 ">
      <div
        className={`w-full h-screen p-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
        style={{
          zIndex: "1",
        }}
      >
        <EditUserForm user={user} setShowPopUp={setShowPopUp} />
      </div>
      <div className="flex justify-start items-center w-[350px]  ">
        <AiOutlineUser className="text-lg" />
        <span className="pl-3">Name : </span>
        <span className="pl-3">{user.firstName}</span>
        <span className="pl-1">{user.lastName}</span>
      </div>
      <div className="items-center flex w-48  mx-24 ">Role: {user.role} </div>
      <div className="flex justify-center items-center font-bold text-green-500 w-12">
        <span className="flex h-3 w-3 relative">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              user.isActive ? "bg-green-400" : "bg-red-500"
            } opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              user.isActive ? "bg-green-400" : "bg-red-500"
            }`}
          ></span>
        </span>
      </div>
      <div className="flex justify-between items-center  w-36 p-3 ml-40">
        <span className="bg-white p-1 rounded-full">
          <BiEdit
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            className="cursor-pointer text-xl text-[#5AB8C0]"
          />
        </span>
        <span className="bg-white p-1 rounded-full">
          <RiDeleteBin6Line
            className="cursor-pointer text-xl text-[#5AB8C0]"
            onClick={() => onDelete(user._id)}
          />
        </span>
      </div>
    </div>
  );
};
export default User;
