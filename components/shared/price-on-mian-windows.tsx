"use client";
import { CalculationCar } from "@/lib/calcilation-car";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import { useCityState } from "@/store/city-filter";

type Props = {
  price_origion: number | null;
  years: string;
  fuel: string | null;
  engine: number;
  isMobile: boolean;
  EUR: number;
  KRW: number;
  fraht: number;
  broker: number;
  k_krw: number;
};
export const PriceAll = ({
  price_origion,
  years,
  fuel,
  engine,
  isMobile,
  EUR,
  KRW,
  fraht,
  broker,
  k_krw,
}: Props) => {
  const priceWon = price_origion ? price_origion * 10000 : 1;
  const realFuel = fuel ? fuel : "Gasoline";
  const stateCity = useCityState((state) => state.cityState);
  const isNoProhodCar = NoProhodCar(years);
  return (
    <div className={`flex flex-col ${isMobile ? "" : "items-end"} `}>
      <span
        className={`text-gray-500 leading-5  ${
          isMobile ? "text-[10px]" : "text-[15px]"
        }`}
      >
        {" "}
        {(stateCity === 0 || stateCity == 1) && "Цена во Владивостоке"}
        {stateCity === 2 && "Цена в Москве"}
      </span>
      <span className={`font-bold ${isMobile ? "text-sm" : "text-lg"}`}>
        ~{" "}
        {isNoProhodCar
          ? new Intl.NumberFormat("ru-RU")
              .format(
                CalculationCar(
                  priceWon,
                  KRW,
                  EUR,
                  engine,
                  realFuel,
                  "4",
                  broker,
                  fraht,
                  k_krw,
                  stateCity
                )
              )
              .replace(",", ".")
          : new Intl.NumberFormat("ru-RU")
              .format(
                CalculationCar(
                  priceWon,
                  KRW,
                  EUR,
                  engine,
                  realFuel,
                  years,
                  broker,
                  fraht,
                  k_krw,
                  stateCity
                )
              )
              .replace(",", ".")}{" "}
        ₽
      </span>
    </div>
  );
};
