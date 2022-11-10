import React, { useEffect, useState } from "react";

import ImgSrc from "../../images/shopsImgs/wheatImage.PNG";
import ItemClassForm from "./ItemClassForm";
import ShowImage from "./ShowImage";
function ItemClass(props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const {
    itemClassId,
    itemClassName,
    categoryId,
    itemClassDeleteHandle,
    itemClassEditHandle,
    profile,
  } = props;
  const [image, setImage] = useState(ImgSrc);
  useEffect(() => {
    if (profile) {
      function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const data = _arrayBufferToBase64(profile.image.data);
      const img = `data:${profile?.mimetype};base64,` + data;
      setImage(img);
    }
  }, []);

  return (
    <div className="w-32 h-32  overflow-clip ml-2 cursor-pointer rounded-2xl border-2 bg-white border-sky-400">
      <div
        className={`w-full h-screen absolute top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
      >
        <ItemClassForm
          itemClassId={itemClassId}
          itemClassName={itemClassName}
          categoryId={categoryId}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
        />
      </div>
      {/* <div className="h-2/3 ">
        <img src={image} alt="image" className="w-full object-cover" />
      </div> */}
      <ShowImage item={{ profile: profile }} />
      <div
        className=" h-1/3 grid w-full"
        style={{ gridTemplateRows: "40% 60%" }}
      >
        <span className=" text-sm pl-5 font-semibold bg-white">
          {itemClassName}
        </span>
        <div
          style={{ gridTemplateColumns: "50% 50%" }}
          className="bg-gray-400 w-full h-full grid"
        >
          <span
            onClick={() => itemClassDeleteHandle(itemClassId)}
            className="bg-[#DBDBDB] w-full text-sm flex items-center pl-3"
          >
            Delete
          </span>
          <span
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            className="bg-[#57B2BA] w-full text-sm flex items-center pl-3"
          >
            Edit
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemClass;
