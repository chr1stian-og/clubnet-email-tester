import React from "react";
import { Route, Routes } from "react-router-dom";
import MultipleTest from "../pages/MultipleTest";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import EmailsList from "../pages/EmailsList";

function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/multiple" element={<MultipleTest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkList" element={<EmailsList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default RoutesComponent;
