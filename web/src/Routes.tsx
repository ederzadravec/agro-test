import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./templates/Auth";
import System from "./templates/System";
import Login from "./pages/Auth/Login";
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
        </Route>

        <Route Component={System}>
          <Route path="/dashboard/*" Component={Dashboard} />
          <Route path="/farm/*" Component={Farm} />
          <Route path="/harvest/*" Component={Harvest} />
          <Route path="/productor/*" Component={Productor} />
          <Route path="/cultivated-plant/*" Component={CultivatedPlant} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
