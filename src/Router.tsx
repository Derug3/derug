import { Route, Routes as DomRoutes } from "react-router";

import React from "react";
import HomePage from "./pages/HomePage";

const Router = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<HomePage />} />
    </DomRoutes>
  );
};

export default Router;
