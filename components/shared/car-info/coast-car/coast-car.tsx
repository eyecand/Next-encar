"use client";
import { CalculationAlert } from "@/app/widjet/calculation-alert/calculation-alert";

import Link from "next/link";
import { detectMake } from "../../form-korea-cars/first-line/lib";
import { useCBR } from "@/hooks/use-cbr";
import { CoastOfRussia } from "./coast-of-Russia";
import { ChekingActiveLot } from "./checking-active-lot";
interface Props {
  krw_price: number;
  isNoProhodCar: boolean;
  isActive: boolean;
  realFuel: string;
  engine: number;
  makes: string;
  model: string;
  strHref: string;
  year: string;
}
export const CoastCar = ({
  krw_price,
  isNoProhodCar,
  realFuel,
  engine,
  makes,
  model,
  strHref,
  year,
  isActive,
}: Props) => {
  const { cbr } = useCBR();
  return (
    <section className="flex flex-col md:flex-row justify-between border-solid border-t border-gray-200 mt-2">
      <div className="flex flex-col gap-4 w-full md:w-[60%] mt-4">
        <div className="flex justify-between items-center text-zinc-500">
          <span>Стоимость в Корее</span>
          <span className="text-lg font-semibold text-zinc-700">
            {new Intl.NumberFormat("ru-RU").format(krw_price).replace(",", ".")}{" "}
            ₩
          </span>
        </div>
        {/* Расчет/показ стоимости авто в России */}
        <CoastOfRussia
          isNoProhodCar={isNoProhodCar}
          krw_price={krw_price}
          engine={engine}
          realFuel={realFuel}
          year={year}
        />
        {/* Подробный расчет */}
        <CalculationAlert
          engine={engine}
          fuel={realFuel}
          priceEn={krw_price}
          year={year}
          EUR={Number(cbr?.get("EUR"))}
          KRW={Number(cbr?.get("KRW"))}
          broker={Number(cbr?.get("broker"))}
          fraht={Number(cbr?.get("fraht"))}
          k_krw={Number(cbr?.get("K_KRW"))}
          copyLink={strHref}
          make={detectMake(makes)}
          model={model === "Canival" ? "Carnival" : model}
          commision={Number(cbr?.get("company_comission"))}
        />
      </div>
      {/* Если лот из табли active_lots, то показывает ссылки на соц сети. Иначе надпись "Лот продан" */}
      <ChekingActiveLot isActive={isActive} strHref={strHref} />
    </section>
  );
};
