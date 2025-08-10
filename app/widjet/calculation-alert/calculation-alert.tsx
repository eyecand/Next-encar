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
import { TooltipUI } from "./lib/tooltip-ui";
import { CustomsDuty } from "./lib/customs-duty";
import { PriceInfoProps } from "./model";
import { useEffect, useRef, useState } from "react";
import { DetectedFullYear } from "@/lib/detected-full-year";
import { CalculationUtilSbor } from "@/lib/calculation-util-sbor";
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
  copyLink,
  make,
  model,
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
        <Button className="px-6 py-6 w-full  bg-gray-400 hover:bg-gray-500 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative mb-2">
          Подробный расчет
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={alertRef}
        className="max-w-2xl rounded-3xl max-h-[95%]"
      >
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle className="flex gap-2 items-center text-base md:text-lg">
            {" "}
            <img
              src="/flag-korea.png"
              alt="flag-korea"
              width={40}
              height={40}
            />
            Расходы в Кореи
          </AlertDialogTitle>
          <IoIosClose
            onClick={handleConfirm}
            size={32}
            className="cursor-pointer hover:text-gray-400 transition-colors duration-150 ease-linear"
          />
        </AlertDialogHeader>

        {fuel === "Electricity" && (
          <div className="mt-6">
            <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
              <div className="flex items-center justify-start gap-2">
                Введите л.с
                <TooltipUI
                  title={
                    "Логистика, снятие с учёта, услуги дилера.Расходы усредненные для предварительных расчетов и могут изменяться"
                  }
                />
              </div>
              <span className="whitespace-nowrap font-semibold text-zinc-600">
                <input
                  onChange={(e) => setPower(e.target.value)}
                  value={power}
                  className="border border-gray-400 px-3 py-1 rounded-lg text-base"
                  type="number"
                />
              </span>
            </div>
          </div>
        )}
        <div className=" flex flex-col">
          <PriceInKorea
            KRW={KRW}
            fraht={fraht}
            priceEn={priceEn}
            k_krw={k_krw}
            totalKorea={totalKorea}
          />
          <PriceInRussian
            customs={broker}
            customsOformlenie={customsOformlenie}
            poshlina={poshlina}
            utilSbor={utilSbor}
            totalRussia={totalRussia}
          />
        </div>
        {/* Общая стоимость */}
        <div className="py-4 border-t-2 border-zinc-200">
          <div className="text-base md:text-lg flex flex-col items-start gap-4 text-zinc-700 group font-bold">
            <div className="flex gap-2 w-full justify-between">
              <span className="inline-block">Общая стоимость под ключ:</span>

              <PriceView
                tilda={true}
                className=""
                label="₽"
                price={String(total)}
              />
            </div>
            {isNoProhodCar ? (
              <div className="flex justify-end w-full items-center gap-2">
                <span className="text-zinc-700 font-normal text-xs md:text-base">
                  (от 3х до 5 лет)
                </span>
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
                />
              </div>
            ) : (
              ""
            )}
            {fuel === "Electricity" && (
              <TooltipUI title="Для более кореектного расчета свяжитесь с оператором" />
            )}
          </div>
        </div>
        <div>
          <a
            href={`https://t.me/Avademus?text=Здравствуйте, заинтересовал автомобиль ${make}, ${model}, ${new Date(
              year
            ).getFullYear()} г., ${engine} см3, ${copyLink}. Хочу получить консультацию.`}
            className="w-full  py-4 text-sm bg-[#e05358] text-white uppercase font-gilroy font-semibold rounded-xl  flex items-center justify-center hover:bg-[#ac3f42] duration-300"
          >
            Заказать
          </a>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
