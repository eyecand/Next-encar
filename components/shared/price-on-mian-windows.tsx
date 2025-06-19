"use client";
import { CalculationPriceForCarNoProhod } from "@/lib/calculation-price-for-car-no-prohod";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import { FromKRWtoRUB } from "@/lib/price-from-krw-to-rub";
import { useCBRStore } from "@/store/cbr";
import { useCityState } from "@/store/city-filter";
import { useEURStore } from "@/store/eur";

type Props = {
  price_origion: number | null;
  years: string;
  fuel: string | null;
  engine: number;
  isMobile: boolean;
};
export const PriceAll = ({
  price_origion,
  years,
  fuel,
  engine,
  isMobile,
}: Props) => {
  const priceWon = price_origion ? price_origion * 10000 : 0;
  const realFuel = fuel ? fuel : "Gasoline";
  const cbr = useCBRStore((state) => state.cbr);
  const EUR = useEURStore((state) => state.eur);
  const stateCity = useCityState((state) => state.cityState);
  const isProhodCarMainPage = NoProhodCar(years);
  return (
    <div className={`flex flex-col ${isMobile ? "" : "items-end"} `}>
      <span
        className={`text-gray-400  ${isMobile ? "text-[10px]" : "text-sm"}`}
      >
        {" "}
        {(stateCity === 0 || stateCity == 1) && "Цена во Владивостоке"}
        {stateCity === 2 && "Цена в Москве"}
      </span>
      <span className={`font-bold ${isMobile ? "text-sm" : "text-lg"}`}>
        ~{" "}
        {isProhodCarMainPage
          ? new Intl.NumberFormat("ru-RU")
              .format(
                CalculationPriceForCarNoProhod(
                  priceWon,
                  cbr,
                  EUR,
                  engine,
                  realFuel,
                  100000,
                  Math.floor(priceWon + 2100000)
                )
              )
              .replace(",", ".")
          : new Intl.NumberFormat("ru-RU")
              .format(
                FromKRWtoRUB(
                  priceWon,
                  cbr,
                  EUR,
                  engine,
                  realFuel,
                  years,
                  stateCity
                )
              )
              .replace(",", ".")}{" "}
        ₽
      </span>
    </div>
  );
};
