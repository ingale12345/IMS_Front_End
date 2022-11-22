import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countUser,
  deleteUser,
  getAllUsers,
  getPFS,
  searchUsers,
  softDeletUser,
} from "../../actions/userAction";
import Pagination from "../common/Pagination";
import AdminSubMenu from "./AdminSubMenu";
import User from "./User";

function Users() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [title, setTitle] = useState("");
  useEffect(() => {
    dispatch(countUser({ title }));
    dispatch(getPFS({ currentPage, pageSize, title }));
  }, []);

  let users = useSelector((state) => state.usersReducer.users);
  users = users.filter((user) => user.role !== "admin");
  const handleSoftDelete = (userId) => {
    const value = window.confirm("Do you Want to Delete this customer");
    if (value) {
      dispatch(deleteUser(userId));
    }
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchUsers(data));
  };

  const totalNoOfUsers = useSelector((state) => state.usersReducer.count);

  const handlePageChange = (currentPage) => {
    // console.log(currentPage);
    setCurrentPage(currentPage);
    const data = { currentPage, pageSize, title };
    dispatch(getPFS(data));
    dispatch(countUser({ title }));
  };

  const handleChange = (e) => {
    let title = e.target.value.trim();
    if (title.length === 0) {
      setTitle("");
    }
    setCurrentPage(1);
    setTitle(title);
    dispatch(
      getPFS({
        currentPage: 1,
        pageSize,
        title,
      })
    );
    dispatch(countUser({ title }));
  };

  return (
    <div>
      <AdminSubMenu searchData={handleChange} />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2 flex justify-center">
          <Pagination
            itemsCount={totalNoOfUsers}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className=" flex flex-col p-5 gap-8 overflow-y-auto">
          {users.length === 0 ? (
            <div>Users Not Found</div>
          ) : (
            users.map((user) => (
              <User user={user} key={user._id} onDelete={handleSoftDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
