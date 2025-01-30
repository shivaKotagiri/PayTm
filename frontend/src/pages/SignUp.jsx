import React from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import Warning from "../components/Warning";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  async function handleSignUp() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username,
        password,
        firstName,
        lastName,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", username.split("@")[0]);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials please try again");
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#7f7f7f]">
        <div className="container flex-col bg-white p-5 rounded-md w-[300px]">
          <Header name={"Sign Up"} />
          <SubHeading
            subHeading={"Enter your information to create an account"}
          />
          <div>
            <InputBox
              label={"First Name"}
              type={"text"}
              placeholder={"First Name"}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputBox
              label={"Last Name"}
              type={"text"}
              placeholder={"Last Name"}
              onChange={(e) => setLastName(e.target.value)}
            />
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
          <Button name={"Sign Up"} onClick={handleSignUp} />
          <Warning
            message={"Already have an account? "}
            tag={"Login"}
            page={"/signin"}
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
