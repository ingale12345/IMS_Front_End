import { Link } from "react-router-dom";
function OrderShopItem(props) {
  const { customerRequisition, removeRequisition, shopItem, item, itemClass } =
    props;

  return !item ? (
    ""
  ) : (
    <div className="flex justify-between">
      <div className=" font-semibold">
        <span className="text-[#5dbec7]">
          {itemClass.name} ({item.name})
        </span>
        <span className="pl-7">----------------------------------</span>
        <span className="pl-4 text-black">
          {shopItem.price}/{shopItem.availableQuantity.unit}
        </span>
      </div>
      <div className="w-1/3 flex justify-between">
        <span className="text-md text-[#989898]">
          Quantity:
          <span className="text-black font-semibold pl-2">
            {customerRequisition.requiredQuntity.amount}
            {customerRequisition.requiredQuntity.unit}
          </span>
        </span>
        <span className="text-[#989898]  text-md">
          Price:
          <span className="text-black pl-2 font-semibold">
            &#8377;
            {+customerRequisition.requiredQuntity.amount * +shopItem.price}
          </span>
        </span>
      </div>
    </div>
  );
}

export default OrderShopItem;
