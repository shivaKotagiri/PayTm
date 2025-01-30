import { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputBox from "../components/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";

function SendMoney() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  async function handleButton() {
    if (amount <= 0 || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#f3f5f7]">
        <div className="container flex-col bg-white p-5 rounded-md w-[350px] shadow-lg">
          <Header name={"Send Money"} />
          <br />
          <br />
          <div className="flex">
            <div className="bg-[#22c45e] text-xl text-white text-center pt-0.75 rounded-full w-[35px] h-[35px]">
              {name[0].toUpperCase()}
            </div>
            <div className="text-[#2b2b2b] font-bold font-sans ml-5 translate-[-10px] text-xl mt-3">
              {name}
            </div>
          </div>
          <div>
            <InputBox
              label={"Amount (in Rs)"}
              type="number"
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {loading ? (
              <div className="flex justify-center py-2">
                <span className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin border-solid"></span>
              </div>
            ) : (
              <button
                onClick={handleButton}
                className="bg-[#22c45e] cursor-pointer hover:bg-[#22c40e] text-white font-semibold py-2 px-4 rounded-md w-full text-sm"
              >
                Initiate Transfer
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SendMoney;
