import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import demoprofileimage from "../../images/demoprofileimage.png";
import { userLogout } from "../../actions/loginAction";
import { getAllUsers } from "../../actions/userAction";
function UserInfoForm(props) {
  const { setShowPopUp, token, setShowEditForm } = props;
  const [image, setImage] = useState(demoprofileimage);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersReducer.users).find(
    (user) => user._id === jwtDecode(token)._id
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
      const data = _arrayBufferToBase64(user?.profile.image?.data);
      if (data) {
        const img = `data:${user.profile?.mimetype};base64,` + data;
        setImage(img);
      }
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  return (
    <div className="select-none font-nunito w-full h-full flex gap-3 flex-col items-center p-3">
      <div className="flex justify-end gap-2 w-full">
        <span className="text-[#4F2B74] font-semibold">Edit</span>
        <span className="w-6 h-6 bg-[#4F2B74] flex items-center justify-center rounded-full">
          <MdOutlineEdit
            onClick={() => {
              setShowEditForm(true);
              setShowPopUp(false);
            }}
            className="text-white cursor-pointer "
          />
        </span>
      </div>

      <div className="w-32 h-32 overflow-clip mt-8 rounded-xl bg-yellow-200">
        <img className="w-32 h-32" src={image} alt="demoImage" />
      </div>
      <div className="font-extrabold flex gap-2 text-2xl">
        <span>{user?.firstName}</span>
        <span>{user?.lastName}</span>
      </div>
      <span className="text-[#4F2B74] font-bold">(+91 {user?.phone})</span>
      <span>{user?.email}</span>
      <div className="flex gap-2 mt-12">
        <span>User Name</span>
        <span className="font-semibold">{user?.userName}</span>
      </div>
      <div className="flex gap-3 mt-12">
        <button
          onClick={() => setShowPopUp(false)}
          className="w-36 font-bold text-[#4F2B74] bg-white  px-6 py-3 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={() => handleLogout()}
          className="w-36 font-bold bg-[#4F2B74] text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserInfoForm;
