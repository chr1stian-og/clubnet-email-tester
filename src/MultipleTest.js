import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { checkSingle } from "@reacherhq/api";
import Navbar from "./Navbar";

// const api = axios.create({ baseURL: "http://localhost:3001" });

function MultipleTest() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState("");
  const [emailToTest, setEmailToTest] = useState("");

  useEffect(() => {});

  function testEmail() {
    alert(`Test ${emailToTest} ?`);
    checkSingle(
      { to_email: emailToTest },
      {
        apiToken: "d561a2fa-3002-11ed-95af-1935d61c5545", // Optional, rate-limited if not provided.
      }
    ).then((resp) => {
      alert(resp.data);
      console.log(resp.data);
    });
  }

  function changeColor() {
    var e = document.querySelector("#input-email");
    e.classList.add("bg-[#ec1554]");
  }

  return (
    <div className="h-screen">
      <center className="mt-10">
        <h1 className="text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
          Clubnet Email Tester
        </h1>
      </center>
      <form className="flex flex-col sm:flex-row items-center justify-center align-center gap-4 mt-20 backgroundColor-[#b05b5b] p-20 rounded-sm">
        <input
          type="file"
          onChange={(e) => setEmailToTest(e.target.value)}
          min={5}
          className="input input-bordered items-center justify-center align-center input-error w-[250px] max-w-xs"
        />
        <button
          // onClick={() => testEmail(" clicked")}
          onClick={() => testEmail(emailToTest)}
          // className="py-2 min-w-fit justify-center align-center items-center rounded-md ml-1.5 hover:bg-[#ec1554] bg-[#f04088] duration-200 text-gray-200 px-4"
          className="btn btn-error"
        >
          test emails
        </button>
      </form>
      <center>
        <h1 className="items-center justify-center align-center">
          {`${result}`}
        </h1>
      </center>
    </div>
  );
}

export default MultipleTest;
