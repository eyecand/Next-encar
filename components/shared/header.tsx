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
const CACHE_EXPIRATION_TIME = 60 * 30 * 1000; // 30 минут

export const Header = () => {
  const setCBRAll = useCBRStore((state) => state.setCBRStore);
  const setCurrentEUR = useEURStore((state) => state.setEURStore);
  const [cbr, setCBR] = useState<CBRPRops | null>(null); // Инициализация null

  const fetchCBRData = useCallback(async () => {
    try {
      const response = await axios.get<CBRPRops>(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const updateCBRStore = useCallback(
    (data: CBRPRops) => {
      if (data) {
        setCBRAll(Number((data.Valute.KRW.Value * 1.08).toFixed(2)));
        setCurrentEUR(data.Valute.EUR.Value);
      }
    },
    [setCBRAll, setCurrentEUR]
  );

  const getCBR = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(CBR_DATA_KEY);
      const cachedTime = localStorage.getItem(`${CBR_DATA_KEY}_time`);
      if (
        cachedData &&
        cachedTime &&
        Date.now() - Number(cachedTime) < CACHE_EXPIRATION_TIME
      ) {
        try {
          const parsedData = JSON.parse(cachedData) as CBRPRops;
          setCBR(parsedData);
          updateCBRStore(parsedData);
          return;
        } catch (error) {
          console.error("Error parsing cached data:", error);
          localStorage.removeItem(CBR_DATA_KEY); // Удалите поврежденные данные из кэша
          localStorage.removeItem(`${CBR_DATA_KEY}_time`);
        }
      }

      const makesAll = await fetchCBRData();
      if (makesAll) {
        setCBR(makesAll);
        updateCBRStore(makesAll);
        localStorage.setItem(CBR_DATA_KEY, JSON.stringify(makesAll));
        localStorage.setItem(`${CBR_DATA_KEY}_time`, Date.now().toString());
      }
    } catch (error) {
      console.log(error);
    }
  }, [fetchCBRData, updateCBRStore]);

  useEffect(() => {
    getCBR();
  }, [getCBR]);
  console.log("header", Number(cbr?.Valute.KRW.Value).toFixed(2));
  return (
    <section className="w-full fixed top-0 left-0 z-10 bg-black">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-1 text-md ">
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
            KRW/RUB: {(Number(cbr?.Valute.KRW.Value) * 1.08).toFixed(2)}
          </span>
        </div>
        <div className="hidden md:flex items-center">
          {/* navitems */}
          <a href="https://t.me/Avademus">
            <button
              type="button"
              className="text-white text-[15px] uppercase bg-[#e05358] px-2 rounded-lg py-2 hover:bg-[#e05358]/80 transition-colors duration-200 ease-in"
            >
              оставить заявку
            </button>
          </a>
        </div>
      </header>
    </section>
  );
};
