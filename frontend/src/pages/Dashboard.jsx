import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
function Dashboard() {
  return (
    <>
      <AppBar />
      <Balance />
      <Users />
    </>
  );
}

export default Dashboard;
