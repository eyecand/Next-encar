"use client";
import { FromKRWtoRUB } from "@/lib/price-from-krw-to-rub";
import { useCBRStore } from "@/store/cbr";
import { useEURStore } from "@/store/eur";

type Props = {
  price_origion: number | null;
  years: number;
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
  return (
    <div className={`flex flex-col ${isMobile ? "" : "items-end"} `}>
      <span
        className={`text-gray-400  ${isMobile ? "text-[10px]" : "text-sm"}`}
      >
        Цена во Владивостоке
      </span>
      <span className={`font-bold ${isMobile ? "text-sm" : "text-lg"}`}>
        ~{" "}
        {new Intl.NumberFormat("ru-RU")
          .format(FromKRWtoRUB(priceWon, cbr, EUR, engine, realFuel, years))
          .replace(",", ".")}{" "}
        ₽
      </span>
    </div>
  );
};
