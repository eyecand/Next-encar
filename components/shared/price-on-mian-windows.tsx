"use client";
import { FromKRWtoRUB } from "@/lib/price-from-krw-to-rub";
import { useCBRStore } from "@/store/cbr";
import { useEURStore } from "@/store/eur";

type Props = {
  price_origion: number | null;
  years: number;
  fuel: string | null;
  engine: number;
};
export const PriceAll = ({ price_origion, years, fuel, engine }: Props) => {
  const priceWon = price_origion ? price_origion * 10000 : 0;
  const realFuel = fuel ? fuel : "Gasoline";
  const cbr = useCBRStore((state) => state.cbr);
  const EUR = useEURStore((state) => state.eur);
  return (
    <span className="font-bold text-lg">
      ~{" "}
      {new Intl.NumberFormat("ru-RU")
        .format(FromKRWtoRUB(priceWon, cbr, EUR, engine, realFuel, years))
        .replace(",", ".")}{" "}
      ₽
    </span>
  );
};
