import React from "react";
import ShowImage from "../Admin/ShowImage";
// import imgSrc from "../../images/shopsImgs/wheatImage.PNG";
function Card(props) {
  const { imgSrc, category, shopsCount, onClick, categoryId, clicked } = props;
  return (
    <div
      onClick={() => onClick(categoryId)}
      className={`max-w-36 max-h-36 overflow-clip cursor-pointer rounded-2xl mb-2 border-2 bg-white ${
        clicked === categoryId ? "border-sky-400" : ""
      } `}
    >
      <div className="h-1/2">
        {/* <img src={imgSrc} alt="image" className="w-full object-cover" /> */}
        <ShowImage item={{ profile: imgSrc }} />
        {/* <img src={imgSrc} alt="image" className="w-full object-cover" /> */}
      </div>
      <div className="h-1/2 flex flex-col pl-4 justify-end">
        <span className="text-sm font-nunito ">{category}</span>
        <span className="font-bold text-sm font-nunito">
          {shopsCount} Shops
        </span>
      </div>
    </div>
  );
}

export default Card;
