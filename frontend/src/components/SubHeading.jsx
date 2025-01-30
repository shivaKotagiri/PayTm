import React from "react";

function SubHeading({subHeading}) {
  return (
    <div className="sub-heading font-sans">
      <div className="text-[#717285] text-center font-[500] text-base mt-3 mb-4">
        {subHeading}
      </div>
    </div>
  );
}
export default SubHeading;
