import React from "react";
import DropDown from "./DropDown";

function AppBar() {
  const name=localStorage.getItem("name");
  return (
    <>
      <div className="flex justify-between font-sans p-4">
        <div className="font-bold text-2xl">Payments App</div>
        <div className="flex">
          <div className="font-medium">Hello, {name}</div>
          <div className="cursor-pointer">
            <DropDown name={name} />
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />
    </>
  );
}

export default AppBar;
