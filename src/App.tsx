import React from "react";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
