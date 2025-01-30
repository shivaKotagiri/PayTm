import React from "react";
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
