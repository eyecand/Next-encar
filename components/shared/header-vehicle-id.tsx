"use client";
import React from "react";
import Image from "next/image";
import { useCBR } from "@/hooks/use-cbr";

export const HeaderVehicleId = () => {
  const { cbr } = useCBR();

  const krwRate = cbr?.find((rate) => rate.char_code === "KRW");

  const KRW = krwRate ? krwRate.value : 57.8;
  return (
    <section className="w-full fixed top-0 left-0 z-10 bg-black">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1 text-md mt-60">
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
            KRW/RUB: {(Number(KRW) * 1.08).toFixed(2)}
          </span>
        </div>
        <div className="hidden md:flex items-center">
          {/* navitems */}
          <a href="https://t.me/Avademus">
            <button className="text-white text-[15px] uppercase bg-[#e05358] px-2 rounded-lg py-2 hover:bg-[#e05358]/80 transition-colors duration-200 ease-in">
              оставить заявку
            </button>
          </a>
        </div>
      </header>
    </section>
  );
};
