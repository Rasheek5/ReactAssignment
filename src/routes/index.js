import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard, Login } from "../screens";

import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../constants";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
