import React from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Warning from "../components/Warning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSignIn() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",username.split("@")[0]);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials please try again");
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#7f7f7f]">
        <div className="container flex-col bg-white p-5 rounded-md w-[300px]">
          <Header name={"Sign In"} />
          <SubHeading
            subHeading={"Enter your credentials to access your account"}
          />
          <div>
            <InputBox
              onChange={(e) => setUsername(e.target.value)}
              label={"Email"}
              type={"email"}
              placeholder={"Username"}
            />
            <InputBox
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              type={"password"}
              placeholder={"Password"}
            />
          </div>
          <Button name={"Sign In"} onClick={handleSignIn} />
          <Warning
            message={"Dont have an account? "}
            tag={"Sign Up"}
            page={"/"}
          />
        </div>
      </div>
    </>
  );
}

export default SignIn;
