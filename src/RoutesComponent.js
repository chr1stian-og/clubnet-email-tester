import React from "react";
import { Route, Routes } from "react-router-dom";
import MultipleTest from "./MultipleTest";
import Settings from "./Settings";
import Home from "./Home";
import Login from "./Login";

function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/multiple" element={<MultipleTest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default RoutesComponent;
