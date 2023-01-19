const _ = require("underscore");
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //   console.log(itemsCount);
  const pages = _.range(1, Math.ceil(itemsCount / pageSize) + 1);

  // if (itemsCount <= pageSize) return;
  return (
    <nav className="flex items-center h-full justify-center">
      <ul className=" flex justify-center  items-center gap-2 ">
        {pages.map((page) => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            // className={currentPage === page ? "page-item active" : "page-item"}
            className={` ${
              currentPage === page
                ? "bg-[#59BB34] scale-125 pointer-events-none cursor-not-allowed text-white"
                : "bg-[#57B2BA] text-black"
            } w-6 h-6 p-1  hover:bg-[#59BB34] hover:scale-125 duration-300 hover:text-white font-bold rounded-3xl justify-center flex items-center`}
            onClick={() => onPageChange(page)}
          >
            <span>{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
