import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { hover } from "@testing-library/user-event/dist/hover";

const api = axios.create({ baseURL: "http://localhost:3001/" });
const loading = require("../assets/loading.gif");

function MultipleTest() {
  const hiddenFileInput = useRef(null);
  const [emailList, setEmailList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [result, setResult] = useState([]);

  // useEffect(() => {});

  const handleChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      var textFile = /text.*/;
      var fileText = "";
      if (file.type.match(textFile)) {
        reader.onload = (event) => {
          fileText = event.target.result;
          const emailArray = Array.from(fileText.split(/\r?\n/));
          setEmailList([...emailArray]);
        };
      } else {
        alert("It must be a text file");
        return;
      }
      reader.readAsText(file);
    }
  };

  async function testList() {
    var error = 0;
    if (emailList) {
      setResult([]);
      for (var i in emailList) {
        try {
          setIsLoading(true);
          await api.post("/testEmail", emailList[i]).then((resp) => {
            setResult((result) => [...result, resp.data]);
            setIsLoading(false);
          });
        } catch (err) {
          error = 1;
          setIsLoading(false);
          console.log("Error while testing email" + err);
        }
      }
    } else {
      alert("Importe uma lista de emails no formato txt para testar");
    }
    if (error === 1) alert("Some error ocurred while testing emails");
  }

  function testSingle(email) {
    var error = 0;

    if (email) {
      setIsLoading2(true);
      try {
        api.post("/testEmail", email.trim()).then((resp) => {
          alert(resp.data);
          // setResult((result) => [...result, resp.data]);
          setIsLoading2(false);
        });
      } catch (err) {
        error = 1;
        console.log("Error while testing email" + err);
      }
      console.log(result);
    } else {
      alert("Erro. Tente novamente");
    }
    if (error === 1) alert("Some error ocurred while testing emails");
  }

  function handleClick() {
    hiddenFileInput.current.click();
  }

  return (
    <div className="">
      <Navbar />
      <center className="mt-10 items-center">
        <h1 className="text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
          Multiple Test
        </h1>
      </center>
      <div className="flex flex-col rounded-lg mx-10 items-center justify-center align-center gap-4 mt-20 backgroundColor-[#b05b5b] p-20">
        <h2 className="flex justify-center align-center items-center">
          Insira a lista de emails no formato *.txt
        </h2>
        <button
          onClick={handleClick}
          className="bg-[#ffffff] rounded-lg py-1 px-4"
        >
          add a text file
        </button>
        <input
          ref={hiddenFileInput}
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
          min={5}
        />
        <div className="gap-2 mt-10 items-center">
          <button
            onClick={() => setEmailList([])}
            className={`btn btn-error ${emailList.length ? "" : "hidden"} mr-2`}
          >
            remove file
          </button>

          <button
            id="test-button"
            onClick={testList}
            className={` ${!isLoading ? "btn btn-error w-fit" : ""} ${
              emailList.length ? "" : "hidden"
            } mr-2 items-center`}
          >
            <span className={`${!isLoading ? "" : "hidden"}`}>
              {emailList.length > 1 ? "Test Emails" : "Test Email"}
            </span>
            <img
              src={loading}
              className={`w-[30px] ${
                isLoading ? "" : "hidden"
              } cursor-default items-center`}
            />
          </button>
        </div>
      </div>
      <center className="flex flex-col ">
        <h1 className={`${emailList.length !== 0 ? "" : "hidden"}`}>
          List to test
        </h1>
        <div
          className={`${
            emailList.length !== 0 ? "" : "hidden"
          } items-center justify-center align-center mx-20 sm:mx-40 rounded-lg mb-10 bg-[#e6e6e6] p-4`}
        >
          {emailList.map((email, id) => (
            <>
              <div
                key={id}
                className={` ${
                  email.length === 0 ? "hidden" : "flex"
                }  justify-between gap-4 items-center`}
              >
                <h1>{email.trim()}</h1>
                <button
                  onClick={() => testSingle(email)}
                  className={`${!isLoading2 ? "" : ""} ${
                    result[id] === "O email é válido"
                      ? "text-green-500"
                      : "text-red-500"
                  } cursor-pointer hover:opacity-70 transition-all duration-250`}
                >
                  <span className={`${!isLoading2 ? "" : "hidden"}`}>
                    {result[id] === "O email é válido" ? "válido" : "inválido"}
                  </span>
                  <img
                    src={loading}
                    className={`w-[20px] ${
                      isLoading2 ? "" : "hidden"
                    } cursor-default `}
                  />
                </button>
              </div>
              <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 opacity-50"></hr>
            </>
          ))}
        </div>
      </center>
    </div>
  );
}

export default MultipleTest;
