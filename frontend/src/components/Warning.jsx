import React from 'react'
import { Link } from "react-router-dom";

function Warning({message,tag,page}) {
  return (
    <>
      <div className="text-[#2b2b2b] font-semibold font-sans text-base mt-3 text-center">
        {message}
        <Link to={page}>
          <span className="underline">{tag}</span>
        </Link>
      </div>
    </>
  );
}

export default Warning