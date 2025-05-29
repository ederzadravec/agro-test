import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "#/components";

import Auth from "./templates/Auth";
import System from "./templates/System";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Dashboard from "./pages/System/Dashboard";
import Harvest from "./pages/System/Harvest";
import Productor from "./pages/System/Productor";
import Farm from "./pages/System/Farm";
import CultivatedPlant from "./pages/System/CultivatedPlant";

const RoutesComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Auth}>
          <Route index Component={Login} />
          <Route path="/logout" Component={Logout} />
        </Route>

        <Route
          Component={() => (
            <PrivateRoute>
              <System />
            </PrivateRoute>
          )}
        >
          <Route path="/dashboard/*" Component={Dashboard} />
          <Route path="/farm/*" Component={Farm} />
          <Route path="/harvest/*" Component={Harvest} />
          <Route path="/productor/*" Component={Productor} />
          <Route path="/cultivated-plant/*" Component={CultivatedPlant} />
        </Route>

        <Route path="*" Component={() => <Navigate to="/dashboard" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
