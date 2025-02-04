"use client";
import { useState } from "react";

import { LiaTelegramPlane } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useClickAway } from "react-use";
import Image from "next/image";

const socialItems = [
  {
    id: "Telegram",
    href: "#",
    icon: <LiaTelegramPlane className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: "Whatsapp",
    href: "#",
    icon: <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: "Instagram",
    href: "#",
    icon: <IoLogoInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
];
const navitems = [{ id: "1", name: "Подбор авто", scrollname: "nomer" }];
export const Header = () => {
  const [isSideMenuOpen, setSideMenue] = useState(false);

  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }
  return (
    <section className="w-full fixed top-0 left-0 z-10 bg-black">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1 text-md ">
        <div className="flex items-center gap-10">
          <div>
            <a
              className="flex items-center"
              href="http://localhost:3000"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {/* <a href="Logo">Logo</a> */}
              <Image
                src="/Logo-red.svg"
                width={75}
                height={75}
                alt="Logo"
              />{" "}
              <span className="text-white text-[20px] font-bold hover:text-red-500 transition-colors duration-200 ease-linear">
                Autofish
              </span>
            </a>
          </div>
          {/* socialItems */}
          <div className="hidden md:flex items-center gap-4">
            {socialItems.map((item) => (
              <button
                key={item.id}
                className={`w-5 h-5 bg-gray-400/70 hover:bg-gray-400/60 ${
                  item.id === "Telegram"
                    ? "hover:text-blue-500"
                    : item.id === "Whatsapp"
                    ? "hover:text-green-500"
                    : "hover:text-purple-500"
                } transition-colors duration-500 ease-in-out text-white sm:w-8 sm:h-8 flex justify-center items-center rounded-lg rounded-xl cursor-pointer`}
              >
                <a href={item.href ?? "#"}>{item.icon}</a>
              </button>
            ))}
          </div>
        </div>
        <div
          className={`${
            !isSideMenuOpen
              ? "opacity-0 "
              : "opacity-1 transition-opacity duration-500"
          }`}
        >
          {isSideMenuOpen && <Mobilenav closeSideMenu={closeSideMenu} />}
        </div>

        <div className="hidden md:flex items-center mr-52">
          {/* navitems */}
          {navitems.map((item) => (
            <a
              className="font-body text-white hover:text-red-500 hover:scale-105  transition-transform duration-200 ease-linear"
              href=""
              key={item.id}
            >
              {item.name}
            </a>
          ))}
        </div>
        <FiMenu
          onClick={openSideMenu}
          className="cursor-pointer text-white text-3xl md:hidden"
        />
      </header>
    </section>
  );
};
function Mobilenav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    closeSideMenu();
  });
  return (
    <div
      className={` fixed left-0 top-0 flex h-full w-full min-h-screen justify-end bg-black/60 md:hidden`}
    >
      <div ref={ref} className="h-full w-[65%] bg-white px-4 py-4">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor pointer text-3xl"
          />
        </div>
        <div className="flex flex-col items-center text-base gap-2 transition-colors">
          {/* navitems */}
          {navitems.map((item) => (
            <a
              onClick={closeSideMenu}
              className="font-body  hover:scale-105 hover:text-red-500 transition-transform duration-300 ease-linear"
              href=""
              key={item.id}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-4 pt-4">
          {socialItems.map((item) => (
            <button
              key={item.id}
              className={`w-7 h-7  bg-gray-400/70 hover:bg-gray-400/60 ${
                item.id === "Telegram"
                  ? "hover:text-blue-500"
                  : item.id === "Whatsapp"
                  ? "hover:text-green-500"
                  : "hover:text-purple-500"
              } transition-colors duration-500 ease-in-out text-white flex justify-center items-center rounded-lg rounded-xl cursor-pointer`}
            >
              <a href={item.href ?? "#"}>{item.icon}</a>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
