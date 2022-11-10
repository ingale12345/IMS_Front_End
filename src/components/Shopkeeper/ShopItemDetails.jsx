function ShopItemDetails(props) {
  const { showItemInfoPopUp, item } = props;
  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return Object.keys(item).length === 0 ? (
    ""
  ) : (
    <div
      className={`w-1/2 h-1/2 rounded-3xl flex flex-col bg-red-300  justify-center items-center overflow-clip absolute  ${
        showItemInfoPopUp ? "block" : "hidden"
      }`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <form className="flex flex-col gap-2">
        <span>{item.name}</span>
        <input
          className="p-2 rounded-lg text-center"
          type="text"
          placeholder="price"
        />
        <input
          className="p-2 rounded-lg text-center"
          type="text"
          placeholder="Initial Quantity"
        />
        <input
          className="p-2 rounded-lg text-center"
          type="text"
          placeholder="Unit"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ShopItemDetails;
