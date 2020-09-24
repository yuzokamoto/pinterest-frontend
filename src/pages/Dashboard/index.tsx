import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/auth";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  async function handleLogout() {
    logout();
  }
  return (
    <div>
      <Header />
      <h3>Dashboard Page</h3>
      <h4>{user && user.name}</h4>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
