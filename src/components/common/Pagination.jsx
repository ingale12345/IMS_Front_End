const _ = require("underscore");
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;
  //   console.log(itemsCount);
  const pages = _.range(1, Math.ceil(itemsCount / pageSize) + 1);

  // console.log(pages);
  // if (itemsCount <= pageSize) return;
  return (
    <nav>
      <ul className=" w-8 flex justify-center  items-center gap-2 flex-col">
        {pages.map((page) => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            // className={currentPage === page ? "page-item active" : "page-item"}
            className={` ${
              currentPage === page
                ? "bg-green-500 text-white"
                : "bg-sky-500 text-black"
            } w-6 h-6 p-1 hover:bg-green-500 hover:text-white font-bold rounded-3xl justify-center flex items-center`}
            onClick={() => props.handlePageChange(page)}
          >
            <span className="">{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
