import React from "react";
import { Route, Switch } from "react-router";

import Login from "../pages/Login";

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);

export default AuthRoutes;
