import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  searchUsers,
  softDeletUser,
} from "../../actions/userAction";
import AdminSubMenu from "./AdminSubMenu";
import User from "./User";
function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let users = useSelector((state) => state.usersReducer.users);
  users = users.filter((user) => user.role !== "admin");
  const handleSoftDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const handleSearchData = (data) => {
    data = data.trim();
    dispatch(searchUsers(data));
  };
  return (
    <div>
      <AdminSubMenu searchData={handleSearchData} />
      <div
        style={{
          gridTemplateColumns: "15% 85%",
          height: "calc(100vh - 141px)",
        }}
        className=" grid"
      >
        <div className=" border-r-2"></div>
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
