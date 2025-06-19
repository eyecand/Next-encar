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
import { CalculationPriceForCarNoProhod } from "@/lib/calculation-price-for-car-no-prohod";
import { NoProhodCar } from "@/lib/is-no-prohod-car";

export const CalculationAlert = ({
  priceEn,
  engine,
  fuel,
  year,
  EUR,
  KRW,
}: PriceInfoProps) => {
  const alertRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

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
  const differentYear = DetectedFullYear(year);
  const util = CalculationUtilSbor(Number(differentYear), engine);
  const customs = 100000; //таможня
  const customsCoast = CustomsDuty(
    priceEn,
    Number(KRW),
    Number(EUR),
    engine,
    fuel,
    differentYear
  );
  const isProhodCar = NoProhodCar(year);

  const fraht = 2100000;
  const totalKorea = Math.floor(priceEn + fraht);
  const totalRussia = customsCoast + customs + util;
  const total = Math.floor(totalKorea * Number(KRW) * 0.001) + totalRussia;

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
                valute={Number(KRW)}
                label="₽"
                className="whitespace-nowrap font-semibold text-zinc-600"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col lg:flex-row gap-4 lg:gap-12">
          <div className="lg:basis-1/2">
            <div>
              <div className="my-6 pl-7 pt-6 border-t border-zinc-100">
                <p className="text-base flex items-start justify-between gap-4 text-zinc-700">
                  Цена авто{" "}
                  <span className="whitespace-nowrap font-semibold text-zinc-600">
                    <PriceView
                      tilda={false}
                      price={String(priceEn)}
                      label="₩"
                      className="text-zinc-400 font-normal text-sm mr-2"
                    />
                    <PriceViewCalclation
                      price={priceEn}
                      valute={Number(KRW)}
                      label="₽"
                      className=""
                    />
                  </span>
                </p>
              </div>
              <div className="my-6 pt-6 border-t border-zinc-100">
                <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
                  <div className="flex items-center justify-start gap-2">
                    <TooltipUI
                      title={
                        "Логистика, снятие с учёта, услуги дилера.Расходы усредненные для предварительных расчетов и могут изменяться"
                      }
                    />{" "}
                    Расходы по Корее
                  </div>
                  <span className="whitespace-nowrap font-semibold text-zinc-600">
                    <PriceView
                      tilda={false}
                      price={String(fraht)}
                      label="₩"
                      className="text-zinc-400 font-normal text-sm mr-2"
                    />
                    <PriceViewCalclation
                      price={fraht}
                      valute={Number(KRW)}
                      label="₽"
                      className=""
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:basis-1/2">
            <div className="my-6 pt-6 border-t border-zinc-100">
              <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
                <div className="flex items-center justify-start gap-2">
                  <span className="whitespace-nowrap  text-zinc-600">
                    Услуги брокера
                  </span>
                </div>
                <PriceView
                  tilda={false}
                  className="whitespace-nowrap font-semibold text-zinc-600"
                  label="₽"
                  price={String(customs)}
                />
              </div>
            </div>
            <div className="my-6 pt-6 border-t border-zinc-100">
              <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
                <div className="flex items-center justify-start gap-2">
                  {" "}
                  Пошлина
                  <span className="ml-2 text-sm text-zinc-500">
                    (на физ. лицо)
                  </span>
                </div>

                <PriceView
                  tilda={true}
                  price={String(customsCoast)}
                  label="₽"
                  className="whitespace-nowrap font-semibold"
                />
              </div>
            </div>
            <div className="my-6 pt-6 border-t border-zinc-100">
              <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
                <div className="flex items-center justify-start gap-2">
                  {" "}
                  Утил. сбор
                </div>

                <PriceView
                  tilda={true}
                  price={String(util)}
                  label="₽"
                  className="whitespace-nowrap font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
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
                  valute={Number(KRW)}
                  price={totalKorea}
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
            !isProhodCar && "items-center"
          )}
        >
          Итого:{" "}
          {isProhodCar ? (
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
                    CalculationPriceForCarNoProhod(
                      priceEn,
                      Number(KRW),
                      Number(EUR),
                      engine,
                      fuel,
                      customs,
                      totalKorea
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
