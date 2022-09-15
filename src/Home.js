import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ReactFormInputValidation from "react-form-input-validation";

// const api = axios.create({ baseURL: "https://www.easyorder.co.mz:6969" });
const api = axios.create({ baseURL: "http://www.easyorder.co.mz:6969" });
const loading = require("./loading.gif");

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [emailToTest, setEmailToTest] = useState("");

  useEffect(() => {
    if (document.getElementById("input-email").value.length == 0) {
      setIsLoading(false);
      setEmailToTest("");
    }
  }, []);

  function testEmail() {
    if (emailToTest) {
      try {
        if (result === null || !isLoading) {
          setIsLoading(true);
          api.post("/testEmail", emailToTest).then((resp) => {
            setResult(resp.data);
            setIsLoading(false);
            // window.open("http://localhost:3000", "_self");
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

  return (
    <div className="h-screen overflow-y-hidden">
      <center className="mt-10">
        <h1 className="text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
          Clubnet Email Tester
        </h1>
      </center>
      <div className="flex flex-col sm:flex-row items-center justify-center align-center gap-4 mt-20 backgroundColor-[#b05b5b] p-20 rounded-sm">
        <input
          id="input-email"
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
        ${result != null && !isLoading ? "flex" : "hidden"}
        gap-2 justify-center items-center align-center`}
      >
        <h1 className="items-center text-xl justify-center align-center">
          Test Result:
        </h1>
        {/* <h1
          className={`items-center ${
            result ? "text-[#158719]" : "text-[#ec1554]"
          } text-xl justify-center align-center`}
        >
          {result ? "the Email is valid" : "the Email is invalid"}
        </h1> */}
        <h1
          className={`items-center ${
            result === "true" ? "text-[#158719]" : "text-[#ec1554]"
          } text-xl justify-center align-center`}
        >
          {result === "true" ? "O email é válido" : "O email não é válido"}
        </h1>
      </div>
      <h1
        className={` ${
          result === "true" ? "hidden" : "block"
        } flex justify-center align-center items-center`}
      >
        {result}
      </h1>
    </div>
  );
}

export default Home;
