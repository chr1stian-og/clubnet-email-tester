import React, { Component } from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen overflow-y-hidden">
      <h1 className="flex mt-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        Login
      </h1>
      <div className="flex mt-20 flex-col gap-2 items-center">
        <input
          placeholder="Username"
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
          min={5}
        />
        <input
          placeholder="Password"
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
          min={5}
        />
        <Link to="/home">
          <button className="bg-[#ec1554] mt-4 px-4 py-2 w-[200px] sm:w-[350px] text-white rounded-xl">
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
