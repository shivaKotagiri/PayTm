import axios from "axios";
import React, { useEffect, useState } from "react";

function Balance() {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance.toFixed(2));
      });
  }, [balance]);
  return (
    <>
      <div className="font-bold text-xl p-4">
        Your Balance
        {balance !== null ? (
          <span className="ml-3 font-bold text-base">{balance}</span>
        ) : (
          <span className="ml-3 text-red-500">Loading...</span>
        )}
      </div>
    </>
  );
}

export default Balance;
