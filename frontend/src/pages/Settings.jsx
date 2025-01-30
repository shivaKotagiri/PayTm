import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Settings() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");

  async function handleButton() {
    if (currentPassword != password) {
      alert("The given password is not similar to current password");
      return;
    } else if (firstName == "" || lastName == "") {
      alert("Please enter the name");
      return;
    } else if (password < 8) {
      alert("The password must be greater than 8 characters");
      return;
    } else {
      try {
        await axios.put(
          `${BACKEND_URL}/api/v1/user/`,
          {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password: password.trim(),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        alert("Profile Updated Successfully");
        navigate("/dashboard");
      } catch (err) {
        alert("Something Went Wrong, Try Again Later!!!");
        console.log(err);
      }
    }
  }

  async function handleDeletion() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/user/delete`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert("Unable to delete the account, Try again Later!!!");
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col p-4 md:p-8 items-center bg-[#7f7f7f] min-h-screen font-sans">
      
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4 bg-white shadow-lg p-4 md:p-6 rounded-md">
        <h1 className="font-sans text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center">
          Account Settings
        </h1>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Update Name</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <hr className="border-gray-300" />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Password</h2>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button name={"Save Password"} onClick={handleButton} />
        </div>
        <hr className="border-gray-300" />

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-black">Delete Account</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Would you like to delete your account? This account contains your{" "}
            <strong>Transaction Details</strong>. Deleting your account will
            remove all content associated with it.
          </p>
          <button
            className="text-red-600 font-medium underline hover:text-red-800 text-sm md:text-base cursor-pointer"
            onClick={handleDeletion}
          >
            I want to delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
