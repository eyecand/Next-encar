"use client";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import axios from "axios";
import { useCBRStore } from "@/store/cbr";
import { useEURStore } from "@/store/eur";

interface CBRPRops {
  Date: string; // Или Date, если будете парсить строку в Date объект
  PreviousDate: string; // Или Date
  PreviousURL: string;
  Timestamp: string; // Или Date
  Valute: {
    [key: string]: ValuteData; // Индексный тип для динамических ключей валют (AUD, AZN, ...)
  };
}

interface ValuteData {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
const CBR_DATA_KEY = "cbrData";
const CACHE_EXPIRATION_TIME = 60 * 30 * 1000; // 1 час
// https://next-encar-git-main-eyecands-projects.vercel.app/
export const Header = () => {
  const setCBRAll = useCBRStore((state) => state.setCBRStore);
  const setCurrentEUR = useEURStore((state) => state.setEURStore);
  const [cbr, setCBR] = useState<CBRPRops>();
  const getCBR = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(CBR_DATA_KEY);
      const cachedTime = localStorage.getItem(`${CBR_DATA_KEY}_time`);

      if (
        cachedData &&
        cachedTime &&
        Date.now() - Number(cachedTime) < CACHE_EXPIRATION_TIME
      ) {
        setCBR(JSON.parse(cachedData) as CBRPRops);
        return;
      }

      const makesAll = (
        await axios.get<CBRPRops>("https://www.cbr-xml-daily.ru/daily_json.js")
      ).data;
      setCBR(makesAll);

      localStorage.setItem(CBR_DATA_KEY, JSON.stringify(makesAll));
      localStorage.setItem(`${CBR_DATA_KEY}_time`, Date.now().toString());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCBR();
  }, [getCBR]);

  useEffect(() => {
    if (cbr) {
      setCBRAll(Number((cbr?.Valute.KRW.Value).toFixed(2)));
      setCurrentEUR(cbr?.Valute.EUR.Value);
    }
  });

  return (
    <section className="w-full fixed top-0 left-0 z-10 bg-black">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1 text-md ">
        <div className="flex items-center gap-10">
          <div>
            <a
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
              <span className="text-white text-[20px] font-bold hover:text-red-500 transition-colors duration-200 ease-linear">
                Autofish
              </span>
            </a>
          </div>
          {/* socialItems */}
        </div>

        <div className="hidden md:flex  items-center ">
          <span className="text-white">
            KRW/RUB: {Number(cbr?.Valute.KRW.Value).toFixed(2)}
          </span>
        </div>
        <div className="hidden md:flex items-center md:mr-16 lg:mr-32">
          {/* navitems */}
          <a href="https://t.me/Avademus">
            <button className="text-white text-[15px] uppercase bg-rose-500/90 px-4 rounded-lg py-2 hover:bg-rose-500/80 transition-colors duration-200 ease-in">
              оставить заявку
            </button>
          </a>
        </div>
      </header>
    </section>
  );
};
