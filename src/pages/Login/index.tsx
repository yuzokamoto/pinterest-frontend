import React from "react";
import Header from "../../components/Header";

import { useAuth } from "../../contexts/auth";

const Login: React.FC = () => {
  const { signed, login } = useAuth();

  console.log(signed);

  async function handleLogin() {
    login({ email: "luiz2@luiz", password: "1234" });
  }

  return (
    <div>
      <Header />
      <h3>Login Page</h3>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
