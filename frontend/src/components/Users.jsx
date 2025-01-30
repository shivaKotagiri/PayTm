import React, { useEffect, useState } from 'react'
import GetUsers from "./GetUsers";
import axios from 'axios';

function Users() {
  const [users,setUsers]=useState([]);
  const [filter,setFilter]=useState("");
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token"),
      }
    }).then(response=>{
      setUsers(response.data.users);
    })
  },[filter]);
  return (
    <>
      <div className="p-4">
        <div className="font-bold text-xl">Users</div>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border-1 border-gray-300 outline-gray-400 rounded p-1 mt-3 mb-5 "
          onChange={(e)=>setFilter(e.target.value)}
        />
        <div>{users.map(user=><GetUsers user={user} key={user._id} /> )}</div>
      </div>
    </>
  );
}

export default Users