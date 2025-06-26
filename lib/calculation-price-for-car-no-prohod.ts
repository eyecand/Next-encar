import { CustomsDuty } from "@/app/widjet/calculation-alert/lib/customs-duty";
import { CalculationUtilSbor } from "./calculation-util-sbor";

export const CalculationPriceForCarNoProhod = (
  priceEn: number,
  KRW: number,
  EUR: number,
  engine: number,
  fuel: string,
  customs: number,
  totalKorea: number
) => {
  const newUtil = CalculationUtilSbor(4, engine);
  const newPoshlina = CustomsDuty(
    priceEn,
    Number(KRW),
    Number(EUR),
    engine,
    fuel,
    4,
    1,
    1
  );
  const totalPoshlina =
    Math.floor(totalKorea * Number(KRW) * 0.001) +
    customs +
    newUtil +
    newPoshlina;
  return totalPoshlina;
};
