"use client";
import { PriceView } from "@/app/widjet/calculation-alert/lib/price-view";
import { useCBR } from "@/hooks/use-cbr";
import { CalculationCar } from "@/lib/calcilation-car";
interface Props {
  isNoProhodCar: boolean;
  krw_price: number;
  engine: number;
  realFuel: string;
  year: string;
}
export const CoastOfRussia = ({
  isNoProhodCar,
  krw_price,
  engine,
  realFuel,
  year,
}: Props) => {
  const { cbr } = useCBR();

  return (
    <div
      className="flex justify-between items-center 
            text-zinc-500"
    >
      <span>Стоимость в России</span>
      <span className="text-xl font-semibold text-zinc-700">
        {isNoProhodCar ? (
          <PriceView
            tilda={true}
            className=""
            label="₽"
            price={String(
              CalculationCar(
                krw_price,
                Number(cbr?.get("KRW")),
                Number(cbr?.get("EUR")),
                engine,
                realFuel,
                "4",
                Number(cbr?.get("broker")),
                Number(cbr?.get("fraht")),
                Number(cbr?.get("K_KRW")),
                Number(cbr?.get("company_comission")),
                0
              )
            )}
          />
        ) : (
          <PriceView
            tilda={true}
            className=""
            label="₽"
            price={String(
              CalculationCar(
                krw_price,
                Number(cbr?.get("KRW")),
                Number(cbr?.get("EUR")),
                engine,
                realFuel,
                year,
                Number(cbr?.get("broker")),
                Number(cbr?.get("fraht")),
                Number(cbr?.get("K_KRW")),
                Number(cbr?.get("company_comission")),
                0
              )
            )}
          />
        )}
      </span>
    </div>
  );
};
