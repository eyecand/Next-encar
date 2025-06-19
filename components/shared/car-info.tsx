"use client";
import {
  AlertDiagnostic,
  BlockItem,
  StatisticAlertDialog,
} from "@/components/shared";
import { IoCopyOutline } from "react-icons/io5";
import { detectFuels } from "@/lib/detect-fuels";
import { FromKRWtoRUB } from "@/lib/price-from-krw-to-rub";
import { Button } from "../ui/button";
import { VehicleIdProps } from "@/app/vehicle/[id]/model";
import { detectTransmission } from "./form-korea-cars/second-line/lib";
import { detectMake } from "./form-korea-cars/first-line/lib";
import { useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { CalculationAlert } from "@/app/widjet/calculation-alert/calculation-alert";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import { PriceView } from "@/app/widjet/calculation-alert/lib/price-view";
import { CalculationPriceForCarNoProhod } from "@/lib/calculation-price-for-car-no-prohod";
export const CarInfo = ({
  details,
  accident,
  accident_details,
  diagnostics,
  vehicle_plate_number,
  advertisements,
  id,
  auctionId,
  sell_type,
}: VehicleIdProps) => {
  const copyLink = `https://autofish.ru/vehicle/${id}`;
  const [isCopy, setIsCopy] = useState(false);
  const isProhodCar = NoProhodCar(String(details?.release_date));
  const copyText = async () => {
    try {
      setIsCopy(true);
      await navigator.clipboard.writeText(copyLink);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (error) {
      console.error(`Failed to copy: ${error}`);
    }
  };
  const totalAccident =
    Number(accident?.other_accident_count) +
    Number(accident?.current_accident_count);
  const [CBR, setCBR] = useState<CBRPRops | null>(null);
  useEffect(() => {
    const localStoredKRW = localStorage.getItem("cbrData");
    if (localStoredKRW) setCBR(JSON.parse(localStoredKRW));
  }, []);
  const realFuel = details?.fuel.fuel_english
    ? details?.fuel.fuel_english
    : "Gasoline";
  return (
    <div className="w-full md:w-1/2">
      <div className="flex">
        <div className="w-[90%]">
          <h2 className="font-gilroy font-bold flex text-2xl lg:text-3xl mb-4 text-zinc-800">
            {detectMake(String(details?.makes.make_short_name))}{" "}
            {details?.model.model_short_name}{" "}
            {new Date(String(details?.release_date)).getFullYear()}
            {realFuel === "Electricity"
              ? " "
              : `, ${(
                  Math.round(Number(details?.engine_displacement)) / 1000
                ).toFixed(1)} л. `}
            из Кореи
          </h2>{" "}
          <div className="flex flex-wrap items-center">
            {String(details?.grades.grade_english).replace(
              " China Manufacturer",
              ""
            )}{" "}
            {details?.grades.grade_detail_english
              ? String(details?.grades.grade_detail_english).replace(
                  " China Manufacturer",
                  ""
                )
              : ""}{" "}
            {totalAccident ? (
              <span className="bg-rose-50 border-rose-100 text-[13px] text-rose-600 ml-1 lg:ml-4 px-3 py-1 rounded-full">
                был в аварии
              </span>
            ) : (
              ""
            )}
            {(sell_type === "RENT_SUCCESSION" || sell_type === "RENT_CAR") && (
              <div className="button flex ml-0 lg:ml-2">
                <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
                  Рента
                </div>
              </div>
            )}
            {(sell_type === "FINANCING_LEASE" ||
              sell_type === "OPERATING_LEASE") && (
              <div className="button flex ml-0 lg:ml-2">
                <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
                  Лизинг
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          disabled={isCopy}
          className="ml-2 w-[10%] flex pt-0 mt-[10px] items-start"
        >
          {" "}
          {isCopy ? (
            <IoIosCheckmark size={25} />
          ) : (
            <IoCopyOutline
              className="cursor-pointer hover:text-gray-500"
              onClick={copyText}
              size={20}
            />
          )}
        </button>
      </div>
      <div className="border-solid border-t border-gray-200 mt-2 pt-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem
            title="Год"
            value={new Date(String(details?.release_date)).getFullYear()}
          />
          <BlockItem
            title="Пробег, км"
            value={new Intl.NumberFormat("ru-RU")
              .format(Number(details?.mileage))
              .replace(",", ".")}
          />
          <BlockItem
            title="Трансмиссия"
            value={detectTransmission(
              String(details?.transmission.transmission_english)
            )}
          />
        </div>
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Двигатель" value={details?.engine_displacement} />
          <BlockItem
            title="Топливо"
            value={detectFuels(String(details?.fuel.fuel_english))}
          />
        </div>
      </div>
      {/* Ссылка на оригинальное обьявление */}
      <div className="group relative w-full grow mt-7">
        <a
          target="_blank"
          href={`https://fem.encar.com/cars/detail/${String(auctionId)}`}
        >
          {" "}
          <Button className=" px-6 py-6 w-full  bg-blue-400 hover:bg-blue-600 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative grow">
            Перейти к объявлению
          </Button>
        </a>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-7">
        <StatisticAlertDialog
          plate_number={vehicle_plate_number}
          accident_details={accident_details}
          details={details}
          accident={accident}
        />
        {diagnostics?.diagnosis === null ||
        diagnostics?.diagnosis === undefined ? (
          <div className="group relative w-full grow">
            <Button
              disabled={true}
              className=" px-6 py-6 w-full   bg-blue-400 hover:bg-blue-600 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative grow"
            >
              Отчет осмотра авто
            </Button>
            <span className="pointer-events-none absolute -top-10 -left-12 w-max bg-gray-50 rounded-lg px-4 py-1 opacity-0 transition-opacity group-hover:opacity-100">
              У данной машины отсутствует диагностика
            </span>
          </div>
        ) : (
          <AlertDiagnostic diagnostics={diagnostics} />
        )}
      </div>

      {/* Total Price */}
      <div className="border-t border-zinc-200 mt-6 pt-6">
        <div className="table price w-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-zinc-500">
              <span>Стоимость в Корее</span>
              <span className="text-lg font-semibold text-zinc-700">
                {new Intl.NumberFormat("ru-RU")
                  .format(Number(advertisements?.price) * 10000)
                  .replace(",", ".")}{" "}
                ₩
              </span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Стоимость в России</span>
              <span className="text-lg font-semibold text-zinc-700">
                {isProhodCar ? (
                  <PriceView
                    tilda={true}
                    className=""
                    label="₽"
                    price={String(
                      CalculationPriceForCarNoProhod(
                        Number(advertisements?.price) * 10000,
                        Number(
                          (Number(CBR?.Valute.KRW.Value) * 1.08).toFixed(2)
                        ),
                        Number(CBR?.Valute.EUR.Value),
                        Number(details?.engine_displacement),
                        realFuel,
                        100000,
                        Math.floor(
                          Number(advertisements?.price) * 10000 + 2100000
                        )
                      )
                    )}
                  />
                ) : (
                  <PriceView
                    tilda={true}
                    className=""
                    label="₽"
                    price={String(
                      FromKRWtoRUB(
                        Number(advertisements?.price) * 10000,
                        Number(
                          (Number(CBR?.Valute.KRW.Value) * 1.08).toFixed(2)
                        ),
                        Number(CBR?.Valute.EUR.Value),
                        Number(details?.engine_displacement),
                        realFuel,
                        String(details?.release_date)
                      )
                    )}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
        <CalculationAlert
          engine={Number(details?.engine_displacement)}
          fuel={realFuel}
          priceEn={Number(advertisements?.price) * 10000}
          year={String(details?.release_date)}
          EUR={Number(CBR?.Valute.EUR.Value)}
          KRW={Number((Number(CBR?.Valute.KRW.Value) * 1.08).toFixed(2))}
        />
        <p className="text-sm text-zinc-600 mt-6 mb-6">
          Стоимость является ориентировочной, включая все расходы в г.
          Владивосток. Расчёт может быть некорректным. <br /> Обратитесь к нам,
          оставив заявку, чтобы получить консультацию.
        </p>
        <a
          href={`https://t.me/Avademus?text=Здравствуйте, заинтересовал автомобиль ${detectMake(
            String(details?.makes.make_short_name)
          )}, ${details?.model.model_short_name}, ${new Date(
            String(details?.release_date)
          ).getFullYear()} г., ${
            details?.engine_displacement
          } см3, ${copyLink}. Хочу получить консультацию.`}
        >
          <button className="w-full p-4 bg-[#e05358] text-white uppercase font-gilroy font-semibold rounded-xl shadow-lg hover:shadow-none shadow-bg-[#e05358]/40 hover:translate-y-2 transition-all transform-gpu flex items-center justify-center relative">
            оставить заявку
          </button>
        </a>
      </div>
      {/* <PriceInfo priceEn={data.average_cost_japan} priceRub={data.full_duty} /> */}
    </div>
  );
};
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
