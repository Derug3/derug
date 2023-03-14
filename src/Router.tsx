import { Route, Routes as DomRoutes } from "react-router";

import React from "react";
import HomePage from "./pages/HomePage";
import Collection from "./pages/Collection";

const Router = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<Collection />} />
    </DomRoutes>
  );
};

export default Router;
