"use client";
import React from "react";
import Image from "next/image";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <section className="w-full px-9 pt-6 pb-4 lg:pb-0 bg-gray-50 ">
      <footer className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row px-4 py-1 justify-between">
        {/* Nav Items */}
        <nav className="flex flex-col items-start text-sm">
          <button className="text-black hover:text-red-500 transition-colors cursor-pointer">
            <Link href="/">Автомобили</Link>
          </button>
          <button className="text-black hover:text-red-500 transition-colors cursor-pointer">
            <Link href="/about"> О нас</Link>
          </button>
        </nav>
        {/* Support */}
        <div className="flex my-3 lg:my-0">
          <Mail size={20} className="text-blue-500 mr-2" />
          <span className="font-bold text-sm">info@autofish.ru</span>
        </div>
        {/* Social */}
        <div className="flex flex-col mt-2 lg:mt-0">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <p className="text-[#212529BF] text-xs">Поддержка</p>
              <p className="font-bold text-xl">+7 (499) 504-04-08</p>
              <p className="text-[#212529BF] text-xs">
                Звонок по России бесплатный
              </p>
            </div>
            <div className="flex items-center justify-between m-0 w-[90px] lg:mx-4">
              <Link
                className="block"
                target="_blank"
                rel="nofollow"
                href="https://t.me/Avademus"
              >
                <button className="flex justify-center items-center bg-gray-100 w-[40px] h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                  <FaTelegram size={25} className="text-blue-500" />
                </button>
              </Link>
              <Link
                className=""
                target="_blank"
                rel="nofollow"
                href="https://wa.me/79265850382"
              >
                <button className="flex justify-center items-center bg-gray-100 w-[40px] h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                  <FaWhatsapp size={25} className="text-green-500" />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col mt-4 text-sm">
            <p>Подписывайтесь на нас в соцсетях</p>
            <Link
              className="flex mt-2"
              target="_blank"
              rel="nofollow"
              href="https://t.me/+Kd_gfq0IVGNiMDcy"
            >
              <button className="flex justify-center items-center h-[40px] w-[40px] bg-gray-100 hover:bg-gray-200  rounded-lg cursor-pointer transition-colors">
                <FaTelegram size={25} className="text-blue-500" />
              </button>
            </Link>
          </div>
        </div>
        {/* Logo */}
        <div>
          <Link
            className="flex items-center"
            href="https://autofish.ru/"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Image src="/Logo-red.svg" width={75} height={75} alt="Logo" />{" "}
            <span className="text-black text-[40px] font-bold hover:text-red-500 transition-colors duration-200 ease-linear">
              Autofish
            </span>
          </Link>
        </div>
      </footer>
    </section>
  );
};
