"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCBR } from "@/hooks/use-cbr";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Separator } from "../ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ChevronDown, HelpCircle, Menu, Phone, Ship, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { detectedCurrentDate } from "@/lib/detected-current-date";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";

export const Header = () => {
  const { cbr } = useCBR();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const krwRate = cbr?.find((rate) => rate.char_code === "KRW");
  const EUR = cbr ? cbr.find((rate) => rate.char_code === "EUR")?.value : 91.07;
  const KRW = krwRate ? krwRate.value : 57.8;
  const K_KRW = cbr
    ? cbr?.find((rate) => rate.char_code === "K_KRW")?.value
    : 1;
  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Закрытие меню
      setIsAnimating(false);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 300); // Время должно совпадать с CSS transition
    } else {
      // Открытие меню
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10); // Небольшая задержка для корректной анимации
    }
  };
  return (
    <>
      <section className="w-full fixed  top-0 left-0 z-10 bg-gray-50 border-b border-b-gray-300">
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
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex text-sm bg-gray-100 py-2 px-2 hover:bg-gray-200  rounded-lg cursor-pointer transition-colors"
              >
                <Menu className="cursor-pointer text-black mr-1" size={20} />{" "}
                Меню
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between ml-1 mt-2 lg:ml-0 lg:mt-0">
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
                    href="https://wa.me/79265850382"
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
                className=" flex justify-center items-center"
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
                      <Link
                        href="/schema"
                        className="flex items-center gap-2 py-1"
                      >
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
                        href="/telegram"
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
                        {(Number(KRW) * Number(K_KRW)).toFixed(2)}
                      </span>
                      <span className="font-semibold">RUB</span>
                      <span className="text-[10px]  bg-gray-100 px-1 py-[2px] rounded-md">
                        Обновлено {detectedCurrentDate(new Date())}
                      </span>
                    </li>
                    <li className="flex items-center gap-4">
                      <Image
                        src="/euro.png"
                        width={45}
                        height={45}
                        alt="Euro"
                      />{" "}
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
      </section>{" "}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden ">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isAnimating ? "opacity-50" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          />

          {/* Menu Content */}
          <div
            className={`fixed top-0 left-0 w-full h-[70%] bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              isAnimating ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Image src="/Logo-red.svg" width={40} height={40} alt="Logo" />
                <span className="text-black text-2xl font-bold ml-2">
                  Autofish
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="p-3">
              <nav className=" text-xs">
                <Link
                  onClick={toggleMobileMenu}
                  href="/"
                  className="block text-gray-600 hover:text-black hover:bg-blue-50 py-2 px-1 hover:rounded-md"
                >
                  Автомобили
                </Link>
                <Link
                  href="/about"
                  onClick={toggleMobileMenu}
                  className="block text-gray-600 hover:text-black hover:bg-blue-50 py-2 px-1 hover:rounded-md"
                >
                  О нас
                </Link>

                <Link
                  href="/schema"
                  onClick={toggleMobileMenu}
                  className="block text-gray-600 hover:text-black hover:bg-blue-50 py-2 px-1 hover:rounded-md"
                >
                  Схема привоза
                </Link>
                <Link
                  onClick={toggleMobileMenu}
                  href="/questions"
                  className="block text-gray-600 hover:text-black hover:bg-blue-50 py-2 px-1 hover:rounded-md"
                >
                  FAQ
                </Link>

                <Link
                  href="/telegram"
                  onClick={toggleMobileMenu}
                  className="block text-gray-600 hover:text-black hover:bg-blue-50 py-2 px-1 hover:rounded-md"
                >
                  Наш телеграм канал
                </Link>
              </nav>
              {/* Currency Rates */}
              <Accordion type="single" collapsible className="text-xs border-0">
                <AccordionItem value="item-1" className="px-1 border-0">
                  <AccordionTrigger className="text-left text-gray-600 font-medium hover:no-underline">
                    Курсы валют
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/korea.jpg"
                          width={45}
                          height={45}
                          alt="Korea"
                        />{" "}
                        <span>KRW</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">
                          {(Number(KRW) * Number(K_KRW)).toFixed(2)}
                        </span>
                        <span className="text-black font-semibold">RUB</span>
                      </div>
                      <span className="text-[10px]  bg-gray-100 px-1 py-[2px] rounded-md">
                        Обновлено {detectedCurrentDate(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/euro.png"
                          width={45}
                          height={45}
                          alt="Euro"
                        />{" "}
                        <span>EUR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">
                          {Number(EUR).toFixed(2)}
                        </span>
                        <span className="text-black font-semibold">RUB</span>
                      </div>
                      <span className="text-[10px]  bg-gray-100 px-1 py-[2px] rounded-md">
                        Обновлено {detectedCurrentDate(new Date())}
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Support Section */}
              <div className="text-xs ">
                <h3 className="text-gray-600 text-sm font-medium mb-4">
                  Поддержка
                </h3>
                <div className="flex items-center gap-3 bg-gray-50 py-2 rounded-lg px-1">
                  <Phone size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-bold">+7 (499) 504-04-08</p>
                    <p className=" text-gray-600">
                      Звонок по России бесплатный
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Link
                    className=" flex justify-center items-center bg-gray-100 py-2  rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                    target="_blank"
                    rel="nofollow"
                    href="https://t.me/Avademus"
                  >
                    <FaTelegram size={25} className="text-blue-500 mr-2" />{" "}
                    <span>Чат в Telegram</span>
                  </Link>
                  <Link
                    className=" flex justify-center items-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                    target="_blank"
                    rel="nofollow"
                    href="https://wa.me/79265850382"
                  >
                    <FaWhatsapp size={25} className="text-green-500 mr-2" />{" "}
                    <span>WhatsApp</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
