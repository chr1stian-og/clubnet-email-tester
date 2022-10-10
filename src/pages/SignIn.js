import React, { Component, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const logo = require("../assets/clubnetlogo.png");
const api = axios.create({ baseURL: "http://localhost:3001/" });

function SignIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function verifiyLogin() {
    if (password === confirmPassword) {
      api
        .post("/createUser", { email, name, password })
        .then((res) => {
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          alert("Erro ao fazer login");
          console.log(err);
        });
    } else {
      alert("As passwords não são iguais");
    }
  }

  return (
    <div className="h-screen mt-36 overflow-y-hidden">
      <span className="flex my-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        <img src={logo} />
      </span>
      {/* <h1 className="flex mt-10 mb-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        Login
      </h1> */}
      <form
        onSubmit={verifiyLogin}
        className="flex flex-col gap-2 items-center"
      >
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          max={30}
          placeholder="Full Name"
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
          min={5}
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          max={15}
          placeholder="email"
          className="rounded-lg  border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
          min={5}
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          min={5}
          max={30}
          type="password"
          placeholder="Password"
          className="rounded-lg mt-4  border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
        />
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          min={5}
          max={30}
          type="password"
          placeholder="Confirm Password"
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
        />
        <button className="bg-[#ec1554] mt-4 px-4 py-2 w-[200px] sm:w-[350px] text-white rounded-xl">
          REGISTRAR
        </button>
        <h1
          className="underline cursor-pointer"
          onClick={() => navigate("/login", { replace: true })}
        >
          Login
        </h1>
      </form>
    </div>
  );
}

export default SignIn;
