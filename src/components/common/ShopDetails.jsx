import React from "react";
import ShowImage from "../Admin/ShowImage";
// import ImgSrc from "../../images/shopsImgs/wheatImage.PNG";
function ShopDetails(props) {
  const { shopName, ImgSrc, shopId, handleClickShop } = props;
  return (
    <div
      onClick={() => handleClickShop(shopId)}
      className="w-32 h-32 overflow-clip m-6 cursor-pointer rounded-2xl mb-2 border-2 bg-white border-sky-400"
    >
      <ShowImage item={{ profile: ImgSrc }} />
      {/* <div className="h-1/2">
        <img src={ImgSrc} alt="image" className="w-full object-cover" />
      </div> */}
      <div className=" flex flex-col pl-4 justify-end">
        <span className="text-sm font-nunito font-bold ">{shopName}</span>
      </div>
    </div>
  );
}

export default ShopDetails;
