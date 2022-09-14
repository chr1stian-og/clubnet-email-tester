import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ReactFormInputValidation from "react-form-input-validation";

const api = axios.create({ baseURL: "http://localhost:3001/" });
const loading = require("./loading.gif");

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [emailToTest, setEmailToTest] = useState("");

  useEffect(() => {}, []);

  function testEmail() {
    if (emailToTest) {
      try {
        if (!result) {
          setIsLoading(true);
          api.post("/testEmail", emailToTest).then((resp) => {
            setResult(resp.data);
            setIsLoading(false);
          });
        }
      } catch (err) {
        alert(
          "error while testing email, try checking your internet connection"
        );
        console.log(err);
      }
    } else {
      alert("Insira um email para testar");
    }
  }

  // function testEmail() {
  //   alert(`Test ${emailToTest} ?`);
  //   checkSingle(
  //     { to_email: emailToTest },
  //     {
  //       apiToken: "970a0ea6da1e4beaa689fdbda04ac019", // Optional, rate-limited if not provided.
  //     }
  //   ).then((resp) => {
  //     alert(resp.data);
  //     console.log(resp.data);
  //   });
  // }

  function changeColor() {
    var e = document.querySelector("#input-email");
    e.classList.add("bg-[#ec1554]");
  }

  return (
    <div className="h-screen overflow-y-hidden">
      <center className="mt-10">
        <h1 className="text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
          Clubnet Email Tester
        </h1>
      </center>
      <div className="flex flex-col sm:flex-row items-center justify-center align-center gap-4 mt-20 backgroundColor-[#b05b5b] p-20 rounded-sm">
        <input
          type="email"
          maxLength={50}
          onChange={(e) => {
            setEmailToTest(e.target.value);
            console.log(emailToTest);
          }}
          min={5}
          placeholder="example@domain.com"
          className="input input-bordered input-error w-full min-w-[250px] max-w-xs text-xl"
        />
        <button
          onClick={() => testEmail(emailToTest)}
          className={` ${
            !isLoading ? "btn btn-error min-w-max" : "block"
          } duration-150 transition-all`}
        >
          <span className={`${!isLoading ? "block" : "hidden"}`}>
            test email
          </span>
          <img
            src={loading}
            className={`w-[30px] ${isLoading ? "block" : "hidden"}`}
          />
        </button>
      </div>
      <div
        className={`flex-row
        ${result ? "flex" : "hidden"}
        gap-2 justify-center items-center align-center`}
      >
        <h1 className="items-center text-xl justify-center align-center">
          Test Result:
        </h1>
        <h1
          className={`items-center ${
            result ? "text-[#158719]" : "text-[#ec1554]"
          } text-xl justify-center align-center`}
        >
          {result ? "the Email is valid" : "the Email is invalid"}
        </h1>
      </div>
    </div>
  );
}

export default Home;