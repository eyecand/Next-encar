import { CustomsDuty } from "@/app/widjet/calculation-alert/lib/customs-duty";
import { CalculationUtilSbor } from "./calculation-util-sbor";
import { DetectedFullYear } from "./detected-full-year";
import { DetectedCustomsClearance } from "./detected-customs-clearance";

export const CalculationCar = (
  origin_price: number,
  KRW: number,
  EUR: number,
  engine: number,
  fuel: string,
  year: string,
  broker: number,
  expensesInKorea: number,
  k_krw: number,
  commision: number,
  stateCity?: number
) => {
  const city = stateCity === 0 || stateCity === 1 ? 0 : 200000;
  const price = origin_price * 0.001;
  const differentYear = Number(year) === 4 ? 4 : DetectedFullYear(year); // cколько полных лет машине
  const util = CalculationUtilSbor(Number(differentYear), engine); // расчет утил. сбора
  const poshlina = CustomsDuty(
    origin_price,
    Number(KRW),
    Number(EUR),
    engine,
    fuel,
    differentYear,
    1,
    1
  ); //расчет пошлины
  const customsOformlenie = DetectedCustomsClearance(price * KRW); // таможенное офрмление
  const result =
    price * KRW * k_krw +
    expensesInKorea * KRW * 0.001 * k_krw +
    broker +
    poshlina +
    util +
    customsOformlenie +
    city +
    commision;
  return Math.floor(result);
};
