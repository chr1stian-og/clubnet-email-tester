import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const clubnetlogo = require("../assets/clubnetlogo.png");

function Navbar() {
  function showMenu() {
    var list = document.querySelector("ul");
    var e = document.querySelector("#menu");

    if (e.name == null) {
      e.name = "menu";
    }

    if (e.name === "menu") {
      e.name = "close";
      list.classList.remove("top-[-400px]");
      list.classList.remove("opacity-0");
    } else {
      e.name = "menu";
      list.classList.add("top-[-400px]");
      list.classList.add("opacity-0");
    }
  }

  function closeNavbar() {
    var e = document.querySelector("#menu");
    var list = document.querySelector("ul");
    e.name = "close";
    list.classList.add("top-[-400px]");
    list.classList.add("opacity-0");
  }

  return (
    <>
      <nav className="bg-white shadow md:flex md:items-center md:justify-between p-1 px-10 z-10">
        <div className="flex justify-between items-center">
          <span className="text-lg cursor-pointer">
            <img
              onClick={() => window.open("http://localhost:3000/", "_self")}
              className="w-[150px] font-semibold  duration-150"
              src={clubnetlogo}
            />
          </span>
          <h1 className="text-lg cursor-pointer md:hidden block  ">
            <p name="menu" id="menu" onClick={showMenu}>
              <GiHamburgerMenu />{" "}
            </p>
          </h1>
        </div>
        <ul className="md:flex md:items-center p-4 sm:p-4 gap-4 sm:px-4 sm:gap-10 md:gap-4 md:z-auto md:static absolute bg-white border-2 rounded-md border-[#b05b5b] sm:border-[#f04088] md:border-transparent w-[250px] sm:inset-x-2/4 inset-x-2/4 md:w-auto md:py-0 md:pl-0 md:opacity-100 opacity-100 top-[-400px] transition-all duration-150">
          <li className="bg-[#ebebeb] duration-300 sm:px-4 rounded-lg w-fit px-2 cursor-pointer hover:bg-[#b7b7b7]">
            <Link to="/home">
              <h1
                onClick={closeNavbar}
                className="my-4 md:my-0 font-semibold duration-150 text-lg"
              >
                Single
              </h1>
            </Link>
          </li>
          <li className="bg-[#ebebeb] duration-300 sm:px-4 rounded-lg w-fit px-2 cursor-pointer hover:bg-[#b7b7b7]">
            <Link to="/multiple">
              <h1
                onClick={closeNavbar}
                className="my-4 md:my-0  font-semibold duration-150 text-lg"
              >
                Multiple
              </h1>
            </Link>
          </li>
          <li className="bg-[#ebebeb] duration-300 sm:px-4 rounded-lg w-fit px-2 cursor-pointer hover:bg-[#b7b7b7]">
            <Link to="/checkList">
              <h1
                onClick={closeNavbar}
                className=" my-4 md:my-0  font-semibold duration-150 text-lg"
              >
                Direct
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <h1
                onClick={closeNavbar}
                className="hover:text-black my-4 md:my-0  font-semibold duration-150 text-lg"
              >
                Settings
              </h1>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <h1
                onClick={closeNavbar}
                className="hover:text-black my-4 md:my-0  font-semibold duration-150 text-lg"
              >
                Sign up
              </h1>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
