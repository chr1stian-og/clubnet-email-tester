import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const api = axios.create({ baseURL: "http://localhost:3001" });
// const api = axios.create({ baseURL: "http://www.easyorder.co.mz:6969" });
const loading = require("./loading.gif");

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [contactToTest, setContactToTest] = useState("");

  useEffect(() => {
    if (document.getElementById("input-contact").value.length === 0) {
      setIsLoading(false);
      setContactToTest("");
    }
  }, []);

  function changeContact() {
    document.getElementById("input-contact").value = "";
    var e = document.getElementById("contact");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    document.getElementById("input-contact").type = text;
    if (text == "Email") {
      document.getElementById("input-contact").placeholder =
        "example@domain.com";
      document.getElementById("input-contact").type = "email";
      document.getElementById("test-button").innerHTML = "Test Email";
    }
    if (text == "Phone Number") {
      document.getElementById("input-contact").placeholder = "84/82 *** ****";
      document.getElementById("input-contact").type = "number";
      document.getElementById("test-button").innerHTML = "Test Phone";
    }
  }

  function testContact(contactToTest) {
    if (document.getElementById("input-contact").type === "email") {
      testEmail(contactToTest);
    } else if (document.getElementById("input-contact").type === "number") {
      testPhone(contactToTest);
    } else {
      alert(
        "Ainda não existe a opção de testar ",
        document.getElementById("input-contact").type
      );
    }
  }

  function testPhone() {
    if (contactToTest) {
      try {
        if (result === null || !isLoading) {
          setIsLoading(true);
          api.post("/testNumber", contactToTest).then((resp) => {
            setResult(resp.data);
            setIsLoading(false);
          });
        }
      } catch (err) {
        alert(
          "error while testing phone number, try checking your internet connection"
        );
        console.log(err);
      }
    } else {
      alert("Insira um numero para testar");
    }
  }

  function testEmail() {
    if (contactToTest) {
      try {
        if (result === null || !isLoading) {
          setIsLoading(true);
          api.post("/testEmail", contactToTest).then((resp) => {
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

  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />

      <h1 className="flex mt-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        Clubnet Contact Tester
      </h1>
      <center>
        <div className="flex flex-col gap-4 mt-20 items-center backgroundColor-[#b05b5b] p-20 rounded-sm">
          <select
            id="contact"
            type="text"
            className="rounded-xl bg-slate-200 text-[#636363] p-2"
            onChange={changeContact}
          >
            <option selected>Email</option>
            <option>Phone Number</option>
          </select>
          <div className="flex flex-col sm:flex-row justify-center align-center items-center gap-4 ">
            <input
              id="input-contact"
              type="email"
              maxLength={50}
              onChange={(e) => {
                setContactToTest(e.target.value);
                console.log(contactToTest);
              }}
              min={5}
              placeholder="example@domain.com"
              className="input input-bordered input-error w-full min-w-[250px] max-w-xs text-xl"
            />
            <button
              id="test-button"
              onClick={() => testContact(contactToTest)}
              className={` ${
                !isLoading ? "btn btn-error w-fit" : "block"
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
        </div>
      </center>
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
