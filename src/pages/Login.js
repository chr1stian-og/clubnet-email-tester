import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const logo = require("../assets/clubnetlogo.png");
const api = axios.create({ baseURL: "http://localhost:3001/" });

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function verifiyLogin() {
    api
      .get("/getUser")
      .then((res) => {
        if (res.data.email === username) {
          if (res.data.password === password) {
            navigate("/home", { replace: true });
          } else {
            alert("Senha errada");
          }
        } else {
          alert("Username errado");
        }
      })
      .catch((err) => {
        alert("Erro ao fazer login");
        console.log(err);
      });
  }

  return (
    <div className="h-screen mt-36 overflow-y-hidden">
      <span className="flex my-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        <img src={logo} />
      </span>

      <form
        onSubmit={verifiyLogin}
        className="flex flex-col gap-2 items-center"
      >
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          max={30}
          placeholder="Username"
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
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
          className="rounded-lg border-[#ec1554] px-2 py-2 w-[200px] sm:w-[350px] text-lg"
        />
        <button className="bg-[#ec1554] mt-4 px-4 py-2 w-[200px] sm:w-[350px] text-white rounded-xl">
          LOGIN
        </button>
        <h1
          className="underline cursor-pointer"
          onClick={() => navigate("/signin", { replace: true })}
        >
          registrar
        </h1>
      </form>
    </div>
  );
}

export default Login;
