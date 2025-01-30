import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function GetUsers({ user }) {
  const navigate = useNavigate();
  function handleButton() {
    navigate("/send?id="+user._id+"&name="+user.firstName);
  }
  return (
    <>
      <div className="flex justify-between mb-3">
        <div className="flex font-sans">
          <div className="bg-[#f5f5f5] flex rounded-full text-black w-[40px] h-[40px] text-base font-medium pt-2 justify-center text-center ml-2">
            {user.firstName[0].toUpperCase()}
          </div>
          <div className="text-lg font-bold mt-1 ml-2">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div>
          <Button name={"Send Money"} onClick={handleButton} />
        </div>
      </div>
    </>
  );
}

export default GetUsers;
