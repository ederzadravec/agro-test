import React from "react";
import { Route, Routes } from "react-router-dom";

import List from "./List";
import Form from "./Form";

const Productor: React.FC = () => {
  return (
    <Routes>
      <Route index Component={List} />
      <Route path="/new" Component={Form} />
    </Routes>
  );
};

export default Productor;
