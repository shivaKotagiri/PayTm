import React from 'react'

function Button({name,onClick}) {
  return (
    <>
      <div>
        <button onClick={onClick} className="bg-[#18181a] cursor-pointer hover:bg-[#303033] text-white font-semibold py-2 px-4 rounded-md w-full text-sm">
          {name}
        </button>
      </div>
    </>
  );
}

export default Button