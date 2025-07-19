"use client";
import React from "react";
import Image from "next/image";
import { useCBR } from "@/hooks/use-cbr";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Separator } from "../../ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { ChevronDown, HelpCircle, Menu, Ship } from "lucide-react";
import { usePathname } from "next/navigation";
import { detectedCurrentDate } from "@/lib/detected-current-date";
import Link from "next/link";

export const HeaderAbout = () => {
  const { cbr } = useCBR();
  const pathname = usePathname();
  const krwRate = cbr?.find((rate) => rate.char_code === "KRW");
  const EUR = cbr ? cbr.find((rate) => rate.char_code === "EUR")?.value : 91.07;
  const KRW = krwRate ? krwRate.value : 57.38;
  return (
    <section className="w-full fixed px-6 top-0 left-0 z-10 bg-gray-50 border-b border-b-gray-300">
      <header className="mx-auto max-w-7xl flex flex-col px-4 py-1 pb-4 text-md">
        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center justify-between">
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
              <span className="text-black text-[20px] font-bold hover:text-red-500 transition-colors duration-200 ease-linear">
                Autofish
              </span>
            </Link>
            <Separator
              className="hidden lg:block h-11 w-[1.5px] ml-4"
              orientation="vertical"
            />
            <button className="lg:hidden flex text-sm bg-gray-100 py-2 px-2 hover:bg-gray-200  rounded-lg cursor-pointer transition-colors">
              <Menu className="cursor-pointer text-black mr-1" size={20} /> Меню
            </button>
          </div>

          <div className="flex items-center justify-between ml-1 mt-2 lg:ml-0 lg:mt-0">
            <div className="flex gap-2">
              <div className="flex flex-col ml-0 lg:ml-5">
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
                  href="https://t.me/Avademus"
                >
                  <button className="flex justify-center items-center bg-gray-100 w-[40px] h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                    <FaWhatsapp size={25} className="text-green-500" />
                  </button>
                </Link>
              </div>
            </div>

            <Separator
              className="hidden lg:block h-11 w-[1.5px]"
              orientation="vertical"
            />
            <Link
              className="mr-2 flex justify-center items-center"
              target="_blank"
              rel="nofollow"
              href="https://t.me/+Kd_gfq0IVGNiMDcy"
            >
              <button className="flex justify-center items-center ml-4 h-[40px] w-[200px] bg-gray-100 hover:bg-gray-200  rounded-lg cursor-pointer transition-colors">
                <FaTelegram size={25} className="text-blue-500" />{" "}
                <span className="ml-2">Наш Telegram-канал</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-between">
          <nav className=" space-x-6 ml-3">
            <button
              // onClick={() => scrollToSection("stages")}
              className={`${
                pathname === "/"
                  ? "text-red-500 hover:text-black "
                  : "text-black hover:text-red-500"
              } text-black hover:text-red-500 transition-colors cursor-pointer`}
            >
              <Link href="/">Автомобили</Link>
            </button>
            <button
              // onClick={() => scrollToSection("clients")}
              className={`${
                pathname === "/about"
                  ? "text-red-500 hover:text-black "
                  : "text-black hover:text-red-500"
              }  transition-colors cursor-pointer`}
            >
              <Link href="/about"> О нас</Link>
            </button>
          </nav>
          <div className="flex gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="flex items-center justify-center bg-gray-100 text-black font-semibold rounded-lg w-[110px] h-[40px]">
                  <span>Справка</span>{" "}
                  <ChevronDown className="mt-1" size={20} />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-60">
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link href="" className="flex items-center gap-2 py-1">
                      <Ship size={20} /> Схема привоза
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/questions"
                      className="flex items-center gap-2 py-1"
                    >
                      <HelpCircle size={20} /> FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 py-1"
                      target="_blank"
                      rel="nofollow"
                      href="https://t.me/+Kd_gfq0IVGNiMDcy"
                    >
                      <FaTelegram size={20} className="text-blue-500" />
                      <span>Наш Telegram-канал</span>
                    </Link>
                  </li>
                </ul>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="flex items-center justify-center bg-gray-100 text-black font-semibold rounded-lg w-[130px] h-[40px]">
                  <span>Курсы валют</span>{" "}
                  <ChevronDown className="mt-1" size={20} />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-120">
                <ul className="flex flex-col gap-2 text-base">
                  <li className="flex items-center gap-4">
                    <Image
                      src="/korea.jpg"
                      width={45}
                      height={45}
                      alt="Korea"
                    />{" "}
                    <span>KRW</span>
                    <span className="text-red-500 font-medium">
                      {(Number(KRW) * 1.08).toFixed(2)}
                    </span>
                    <span className="font-semibold">RUB</span>
                    <span className="text-[10px]  bg-gray-100 px-1 py-[2px] rounded-md">
                      Обновлено {detectedCurrentDate(new Date())}
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Image src="/euro.png" width={45} height={45} alt="Euro" />{" "}
                    <span>EUR</span>
                    <span className="text-red-500 font-medium">
                      {Number(EUR).toFixed(2)}
                    </span>
                    <span className="font-semibold">RUB</span>
                    <span className="text-[10px]  bg-gray-100 px-1 py-[2px] rounded-md">
                      Обновлено {detectedCurrentDate(new Date())}
                    </span>
                  </li>
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>
    </section>
  );
};
