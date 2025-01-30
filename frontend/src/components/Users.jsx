import React, { useEffect, useState } from "react";
import GetUsers from "./GetUsers";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`${BACKEND_URL}/api/v1/user/bulk?filter=` + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [filter]);

  return (
    <div className="p-4">
      <div className="font-bold text-xl">Users</div>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full border-1 border-gray-300 outline-gray-400 rounded p-1 mt-3 mb-5 "
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="w-10 h-10 border-5 border-t-transparent border-blue-500 rounded-full animate-spin border-solid"></span>
        </div>
      ) : (
        <div>
          {users.length > 0 ? (
            users.map((user) => <GetUsers user={user} key={user._id} />)
          ) : (
            <div>No users found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
