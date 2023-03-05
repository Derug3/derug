import { Route, Routes as DomRoutes } from "react-router";

import React from "react";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";

const Router = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
    </DomRoutes>
  );
};

export default Router;
