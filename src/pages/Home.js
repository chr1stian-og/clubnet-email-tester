import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Dialog from "../components/Dialog";
import Footer from "../components/Footer";

const api = axios.create({ baseURL: "http://localhost:3001" });
const loading = require("../assets/loading.gif");

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [contactToTest, setContactToTest] = useState("");
  const [contactType, setContactType] = useState("email");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (document.getElementById("input-contact").value.length === 0) {
      setIsLoading(false);
      setContactToTest("");
    }
  }, []);

  function changeContact() {
    document.getElementById("input-contact").value = "";
    var e = document.getElementById("contact");
    var text = e.options[e.selectedIndex].text;
    document.getElementById("input-contact").type = text;
    if (text === "Email") {
      setContactType("email");
      document.getElementById("input-contact").placeholder =
        "example@domain.com";
      document.getElementById("input-contact").type = "email";
      document.getElementById("test-button").innerHTML = "Test Email";
      document.getElementById("test-result").innerHTML = "";
      document.getElementById("test").innerHTML = "";
      setResult(null);
    }
    if (text === "Phone Number") {
      setContactType("phone");
      document.getElementById("input-contact").placeholder = "8* *** ****";
      document.getElementById("input-contact").type = "number";
      document.getElementById("test-button").innerHTML = "Test Phone";
      document.getElementById("test-result").innerHTML = "";
      document.getElementById("test").innerHTML = "";
      setResult(null);
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
    setIsLoading(false);
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
    setIsLoading(false);
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

  const stopTest = () => {
    alert("Stop testing the emails ? ");
    return;
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />
      <h1 className="flex mt-10 text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
        Single Test
      </h1>
      <center className="rounded-lg mx-10">
        <div className="flex flex-col gap-4 mt-20 items-center backgroundColor-[#b05b5b] p-20 rounded-sm">
          <select
            id="contact"
            type="text"
            className="rounded-xl bg-[#dadada] text-[#484848] text-md p-2"
            onChange={changeContact}
          >
            <option>Email</option>
            <option>Phone Number</option>
          </select>
          <div className="flex flex-col sm:flex-row justify-center align-center items-center gap-4 ">
            <input
              id="input-contact"
              type="email"
              maxLength={50}
              onChange={(e) => {
                setContactToTest(e.target.value);
              }}
              min={5}
              placeholder="example@domain.com"
              className="input input-bordered input-error w-full min-w-[350px] max-w-xs text-xl"
            />
            <button
              id="test-button"
              onClick={() => testContact(contactToTest)}
              className={` ${
                !isLoading ? "btn btn-error w-fit" : "block"
              } duration-150 transition-all`}
            >
              <span className={`${!isLoading ? "block" : "hidden"}`}>
                Test Email
              </span>
              <img
                onClick={stopTest}
                src={loading}
                className={`w-[30px] ${
                  isLoading ? "block" : "hidden"
                } cursor-default hover:cursor-pointer`}
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
        <h1
          id="test"
          className="items-center text-xl justify-center align-center"
        >
          Test Result:
        </h1>
      </div>
      <h1
        id="test-result"
        className={`
        ${
          contactType === "phone"
            ? result != "Sem nome"
              ? "text-green-600"
              : "text-red-500"
            : result != "O email é válido"
            ? "text-red-500"
            : "text-green-600"
        }
          flex justify-center text-2xl align-center items-center`}
      >
        {result === "O email é válido" ? "O email é válido" : result}
      </h1>
      <center
        className={`mt-20 $${
          contactType === "phone"
            ? result != "Sem nome"
              ? "hidden"
              : "block"
            : result != "O email é válido"
            ? "block"
            : "hidden"
        }`}
      >
        {/* <button
          className="btn btn-sm btn-primary"
          onClick={() => setShow(true)}
        >
          Enviar Link
        </button>
        <h1
          className="underline cursor-pointer mt-2"
          onClick={() =>
            alert(
              "Será enviado um link para o endereço acima que irá rederecionar para o site myclubnet onde poderá actualizar os detalhes da conta"
            )
          }
        >
          saiba mais
        </h1> */}
      </center>
      <Dialog isOpen={show} onClose={() => setShow(false)}>
        Enviar Link ?
      </Dialog>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
