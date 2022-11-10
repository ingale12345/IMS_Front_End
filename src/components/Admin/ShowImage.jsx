import React, { useEffect, useState } from "react";
import ImgSrc from "../../images/shopsImgs/wheatImage.PNG";
function ShowImage(props) {
  const { item } = props;
  const [image, setImage] = useState(ImgSrc);
  useEffect(() => {
    if (item?.profile) {
      function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const data = _arrayBufferToBase64(item?.profile.image.data);
      setTimeout(() => {
        setImage(`data:${item.profile?.mimetype};base64,` + data);
      }, 100);
      // const img = `data:${item.profile?.mimetype};base64,` + data;
    }
  }, [item]);

  return (
    <div className="h-2/3 ">
      <img src={image} alt="image" className="w-full object-cover" />
    </div>
  );
}

export default ShowImage;
