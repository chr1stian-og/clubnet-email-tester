import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { checkSingle } from "@reacherhq/api";
import Navbar from "../components/Navbar";

const api = axios.create({ baseURL: "http://localhost:3001" });

function MultipleTest() {
  const [emailList, setEmailList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {});

  // function testEmail() {
  //   alert(`Test ${emailToTest} ?`);
  //   checkSingle(
  //     { to_email: emailToTest },
  //     {
  //       apiToken: "d561a2fa-3002-11ed-95af-1935d61c5545", // Optional, rate-limited if not provided.
  //     }
  //   ).then((resp) => {
  //     alert(resp.data);
  //     console.log(resp.data);
  //   });
  // }

  function readFile(e) {
    setEmailList(e.target.files[0]);
  }
  async function testList() {
    alert(`test ${emailList} list ?`);
    if (emailList) {
      try {
        if (result === null || !isLoading) {
          setIsLoading(true);
          await api.post("/testMultiple", emailList).then((resp) => {
            setResult(resp.data);
            setIsLoading(false);
          });
        }
      } catch (err) {
        alert(
          "error while testing email list, try checking your internet connection"
        );
        console.log(err);
      }
    } else {
      alert("Importe uma lista de emails no formato txt para testar");
    }
  }
  return (
    <div className="h-screen">
      <Navbar />
      <center className="mt-10">
        <h1 className="text-[#ec1554] min-w-max font-bold text-3xl justify-center items-center align-center">
          Multiple Test
        </h1>
      </center>
      <div className="flex flex-col bg-[#ebebeb] rounded-lg  mx-10 sm:flex-row items-center justify-center align-center gap-4 mt-20 backgroundColor-[#b05b5b] p-20">
        <input
          type="file"
          onChange={(e) => readFile(e)}
          min={5}
          className="input input-bordered items-center justify-center align-center input-error w-[250px] max-w-xs"
        />
        <button onClick={() => testList(emailList)} className="btn btn-error">
          test emails
        </button>
      </div>
      <center>
        <h1 className="items-center justify-center align-center">
          {`${result}`}
        </h1>
        <h1 className="font-bold text-xl text-[#262626]">*Emails to test*</h1>
        {/* <h1 className="items-center text-sm font-thin justify-center align-center">
          {`${emailList}`}
        </h1> */}
      </center>
    </div>
  );
}

export default MultipleTest;
