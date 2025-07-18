"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import { PriceView } from "./lib/price-view";
import { PriceViewCalclation } from "./lib/price-view-calculation";
import { TooltipUI } from "./lib/tooltip-ui";
import { CustomsDuty } from "./lib/customs-duty";
import { PriceInfoProps } from "./model";
import { useEffect, useRef, useState } from "react";
import { DetectedFullYear } from "@/lib/detected-full-year";
import { CalculationUtilSbor } from "@/lib/calculation-util-sbor";
import { cn } from "@/lib/utils";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import { DetectedKPower } from "@/lib/detected-K-power";
import { DetectedCustomsClearance } from "@/lib/detected-customs-clearance";
import { PriceInRussian } from "./price-in-russian";
import { PriceInKorea } from "./price-in-korea";
import { CalculationCar } from "@/lib/calcilation-car";

export const CalculationAlert = ({
  priceEn,
  engine,
  fuel,
  year,
  EUR,
  KRW,
  fraht,
  broker,
  k_krw,
}: PriceInfoProps) => {
  const alertRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [power, setPower] = useState("1");
  const [poshlina, SetPoshlina] = useState(0);
  const [utilSbor, SetUtilSbor] = useState(3200);

  useEffect(() => {
    const differentYear = DetectedFullYear(year);
    const util = CalculationUtilSbor(Number(differentYear), engine); // расчет утил. сбора
    const K_Power = DetectedKPower(Number(power)); // расчет надбавки по л.с. для электро
    const customsCoast = CustomsDuty(
      priceEn,
      KRW,
      EUR,
      engine,
      fuel,
      differentYear,
      Number(power),
      K_Power
    ); // расчет пошлины

    SetPoshlina(customsCoast);
    SetUtilSbor(util);
  }, [power, priceEn, KRW, EUR, engine, fuel, year]);
  const customsOformlenie = DetectedCustomsClearance(
    priceEn * Number(KRW) * 0.001
  ); // таможенное офрмление

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const isNoProhodCar = NoProhodCar(year);
  const totalKorea = priceEn + fraht;
  const totalRussia = poshlina + broker + utilSbor + customsOformlenie;
  const total = Math.floor(totalKorea * KRW * 0.001 * k_krw) + totalRussia;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild onClick={openDialog}>
        <Button className="px-6 py-6 w-full  bg-gray-400 hover:bg-gray-500 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative mt-8">
          Подробный расчет
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent ref={alertRef}>
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle>Подробный расчет</AlertDialogTitle>
          <IoIosClose
            onClick={handleConfirm}
            size={32}
            className="cursor-pointer hover:text-gray-400 transition-colors duration-150 ease-linear"
          />
        </AlertDialogHeader>

        <div className="gap-4 lg:gap-12 w-full border-t border-zinc-100 pt-4 flex md:flex-row flex-col items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full justify-center">
            <p className="text-base text-zinc-700">Стоимость авто</p>
            <div className="flex items-center justify-between gap-3">
              <div className="max-w-[200px] relative font-medium">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center pr-3">
                  ₩
                </span>
                <span className="border border-b-2 text-[16px] rounded-lg py-2 px-8">
                  <PriceView
                    tilda={true}
                    price={String(priceEn)}
                    label=""
                    className=""
                  />
                </span>
              </div>
              ~
              <PriceViewCalclation
                price={priceEn}
                valute={KRW}
                label="₽"
                className="whitespace-nowrap font-semibold text-zinc-600"
                k={k_krw}
              />
            </div>
          </div>
        </div>
        {fuel === "Electricity" && (
          <div className="gap-4 lg:gap-12 w-full pt-4 flex justify-center md:flex-row flex-col items-center">
            <span className="text-base text-zinc-700">Введите л.с</span>
            <input
              onChange={(e) => setPower(e.target.value)}
              value={power}
              className="border border-gray-400 px-3 py-1 rounded-lg text-base"
              type="number"
            />
          </div>
        )}
        <div className="mt-5 flex flex-col lg:flex-row gap-4 lg:gap-12">
          <PriceInKorea
            KRW={KRW}
            fraht={fraht}
            priceEn={priceEn}
            k_krw={k_krw}
          />
          <PriceInRussian
            customs={broker}
            customsOformlenie={customsOformlenie}
            poshlina={poshlina}
            utilSbor={utilSbor}
          />
        </div>
        {/* Общая стоимость */}
        <div className="flex flex-col lg:flex-row  -mt-8 lg:-mt-0  ">
          <div className="lg:basis-1/2 lg:pr-2">
            <p className="text-lg font-semibold font-gilroy mt-12 lg:mt-6 flex items-center justify-between gap-4">
              Итого в Корее{" "}
              <span className="whitespace-nowrap font-semibold text-red-600">
                <PriceView
                  tilda={true}
                  className="text-red-400 font-normal text-sm mr-2"
                  price={String(totalKorea)}
                  label="₩"
                />
                ~{" "}
                <PriceViewCalclation
                  className="text-lg"
                  label="₽"
                  valute={KRW}
                  price={totalKorea}
                  k={k_krw}
                />
              </span>
            </p>
          </div>
          <div className="lg:basis-1/2 lg:pl-6">
            <p className="text-lg font-semibold font-gilroy mt-12 lg:mt-6 flex items-center justify-between gap-4">
              Итого в России
              <PriceView
                tilda={true}
                price={String(totalRussia)}
                label="₽"
                className="whitespace-nowrap font-semibold text-red-600"
              />
            </p>
          </div>
        </div>
        <div
          className={cn(
            "bg-zinc-50 -mx-6 p-6 relative min-w-full flex justify-center my-4 text-red-600 gap-2 text-xl font-bold",
            !isNoProhodCar && "items-center"
          )}
        >
          Итого:{" "}
          {isNoProhodCar ? (
            <div className="flex flex-col">
              <div>
                <PriceView
                  tilda={true}
                  className=""
                  label="₽"
                  price={String(total)}
                />
              </div>
              <div>
                <PriceView
                  tilda={true}
                  className=""
                  label="₽"
                  price={String(
                    CalculationCar(
                      priceEn,
                      KRW,
                      EUR,
                      engine,
                      fuel,
                      "4",
                      broker,
                      fraht,
                      k_krw,
                      1
                    )
                  )}
                />{" "}
                <span className="text-zinc-700 font-normal text-sm md:text-base">
                  (от 3х до 5 лет)
                </span>
              </div>
            </div>
          ) : (
            <PriceView
              tilda={true}
              className=""
              label="₽"
              price={String(total)}
            />
          )}
          {fuel === "Electricity" && (
            <TooltipUI title="Для более кореектного расчета свяжитесь с оператором" />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
