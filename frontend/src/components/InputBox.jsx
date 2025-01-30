import React from 'react'

function InputBox({label,onChange, type, placeholder }) {
  return (
    <>
      <label
        className="block text-black text-sm font-semibold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="mb-5 appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-black focus:shadow-outline"
        id={label}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputBox