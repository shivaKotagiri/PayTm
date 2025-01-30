import React from "react";

function Header({ name }) {
  return (
    <>
      <div className="font-bold text-3xl font-ui-sans-serif text-center">
        {name}
      </div>
    </>
  );
}

export default Header;
