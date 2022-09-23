import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />

      <h1 className="flex mt-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        Email List
      </h1>
      <div className="flex mt-20 flex-col gap-2 items-center">
        <div class="overflow-x-auto">
          <div className="my-2 gap-4 min-flex flex-row">
            <Link to="/home">
              <button className="bg-[#ec1554] w-1/2 py-1 text-white rounded-lg">
                FETCH
              </button>
            </Link>
            <Link to="/home">
              <button className="bg-[#ec1554] w-1/2 py-1 text-white rounded-lg">
                TEST
              </button>
            </Link>
          </div>
          <center>
            <table class="flex justify-center align-center items-center table table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>From</th>
                  <th>To</th>
                  <th>Body</th>
                  <th>Date</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>cobrancas@clubnet.mz</td>
                  <td>christian.macarthur@clubnet.mz</td>
                  <td>Boa tarde sr Christian ...</td>
                  <td>9:51</td>
                  <td className="text-green-600">funciona</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>cobrancas@clubnet.mz</td>
                  <td>christian.macarthur@gamail.com</td>
                  <td>Boa tarde sr Christian ...</td>
                  <td>9:51</td>
                  <td className="text-red-600">não funciona</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Login;
