import React, { useEffect } from "react";
import { useState } from "react";
import ImgSrc from "../../images/shopsImgs/wheatImage.PNG";
import CategoryForm from "./CategoryForm";
import ShowImage from "./ShowImage";
function Category(props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const { categoryId, categoryName, categoryDeleteHandle, profile } = props;

  return (
    <div className="w-32 h-32  overflow-clip ml-2 cursor-pointer rounded-2xl border-2  border-sky-400">
      <div
        className={`w-full h-screen absolute top-0 left-0 bg-gray-500/60 ${
          showPopUp ? "block" : "hidden"
        }`}
      >
        <CategoryForm
          categoryId={categoryId}
          categoryName={categoryName}
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
        <span className=" text-sm pl-5 font-semibold  bg-white">
          {categoryName}
        </span>
        <div
          style={{ gridTemplateColumns: "50% 50%" }}
          className="bg-gray-400 w-full h-full grid"
        >
          <span
            onClick={() => categoryDeleteHandle(categoryId)}
            className="bg-[#DBDBDB] w-full text-sm flex items-center pl-3"
          >
            Delete
          </span>
          <span
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
            className="bg-[#57B2BA] w-full text-sm text-white flex items-center pl-3"
          >
            Edit
          </span>
        </div>
      </div>
    </div>
  );
}

export default Category;
