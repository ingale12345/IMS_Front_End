import React from "react";
import { useSelector } from "react-redux";

function InvoiceRequisitionDetails(props) {
  const { requisition, getTotal } = props;
  const shopItem = useSelector(
    (state) => state.shopItemsReducer.shopItems
  ).find((shopItem) => shopItem._id === requisition.shopItem);
  const items = useSelector((state) => state.itemsReducer.items);
  const itemClasses = useSelector(
    (state) => state.itemClassesReducer.itemClasses
  );

  let item;
  let itemClass;
  if (shopItem) {
    item = items.find((item) => item._id === shopItem.item);
    itemClass = itemClasses.find(
      (itemClass) => itemClass._id === item.itemClass
    );
  }

  if (shopItem) getTotal(+shopItem.price * +requisition.requiredQuntity.amount);

  //   console.log(itemClass);
  return !requisition ? (
    ""
  ) : (
    <div className="bg-[#FAFAFA] flex font-nunito font-bold overflow-clip flex-col mb-2 rounded-lg w-full h-16">
      <div className="w-full  ">
        <span className="ml-3 text-[#57B2BA]">
          {itemClass?.name} ({item?.name})
        </span>
      </div>
      <div className="h-full items-center flex justify-between">
        <div>
          <span className="ml-3">
            &#8377;{shopItem?.price}/{shopItem?.availableQuantity.unit}
          </span>
          <span className="ml-5 text-[#636262]">
            Ordered:{requisition.requiredQuntity.amount}
            {requisition.requiredQuntity.unit}
          </span>
        </div>
        <span className="pr-3">
          &#8377;{+shopItem?.price * +requisition.requiredQuntity.amount}
        </span>
      </div>
    </div>
  );
}

export default InvoiceRequisitionDetails;
