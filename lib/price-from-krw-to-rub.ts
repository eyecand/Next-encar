import { CalculationUtilSbor } from "./calculation-util-sbor";
import { DetectedFullYear } from "./detected-full-year";
// Расчет стоимости для главной транице дексктоп/мобаил
export function FromKRWtoRUB(
  origin_price: number,
  KRW: number,
  EUR: number,
  engine: number,
  fuel: string,
  year: string,
  stateCity?: number
) {
  const differentYear = DetectedFullYear(year);
  const util = CalculationUtilSbor(Number(differentYear), engine);
  let result = 0;
  if (fuel === "Electricity") {
    if (differentYear < 3) {
      result =
        origin_price * 0.001 * KRW +
        origin_price * 0.001 * KRW * 0.15 +
        (origin_price * 0.001 * KRW + origin_price * 0.001 * KRW * 0.15) * 0.2 +
        3400 +
        100000 +
        2100 * KRW;
    } else {
      result =
        origin_price * 0.001 * KRW +
        origin_price * 0.001 * KRW * 0.15 +
        (origin_price * 0.001 * KRW + origin_price * 0.001 * KRW * 0.15) * 0.2 +
        util +
        100000 +
        2100 * KRW;
    }
  } else {
    if (differentYear < 3) {
      if (origin_price * 0.001 * KRW < 8500 * EUR) {
        if (origin_price * 0.001 * KRW * 0.54 >= engine * 2.5 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.54 +
            util +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 2.5 * EUR +
            util +
            100000 +
            2100 * KRW;
        }
      } else if (
        origin_price * 0.001 * KRW > 8500 * EUR &&
        origin_price * 0.001 * KRW < 16700 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 3.5 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.48 +
            util +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 3.5 * EUR +
            util +
            100000 +
            2100 * KRW;
        }
      } else if (
        origin_price * 0.001 * KRW > 16700 * EUR &&
        origin_price * 0.001 * KRW < 42300 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 5.5 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.48 +
            util +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 5.5 * EUR +
            util +
            100000 +
            2100 * KRW;
        }
      } else if (
        origin_price * 0.001 * KRW > 42300 * EUR &&
        origin_price * 0.001 * KRW < 84500 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 7.5 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.48 +
            util +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 7.5 * EUR +
            util +
            100000 +
            2100 * KRW;
        }
      } else if (
        origin_price * 0.001 * KRW > 84500 * EUR &&
        origin_price * 0.001 * KRW < 169000 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 15 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.48 +
            util +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 15 * EUR +
            util +
            100000 +
            2100 * KRW;
        }
      } else if (origin_price * 0.001 * KRW >= 169000 * EUR) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 20 * EUR) {
          result =
            origin_price * 0.001 * KRW +
            origin_price * 0.001 * KRW * 0.48 +
            3400 +
            100000 +
            2100 * KRW;
        } else {
          result =
            origin_price * 0.001 * KRW +
            engine * 20 * EUR +
            3400 +
            100000 +
            2100 * KRW;
        }
      }
    } else if (differentYear >= 3 && differentYear <= 5) {
      if (engine <= 1000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 1.5 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1000 && engine <= 1500) {
        result =
          origin_price * 0.001 * KRW +
          engine * 1.7 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1500 && engine <= 1800) {
        result =
          origin_price * 0.001 * KRW +
          engine * 2.5 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1800 && engine <= 2300) {
        result =
          origin_price * 0.001 * KRW +
          engine * 2.7 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 2300 && engine <= 3000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 3 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 3000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 3.6 * EUR +
          util +
          100000 +
          2100 * KRW;
      }
    } else if (differentYear > 5) {
      if (engine <= 1000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 3 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1000 && engine <= 1500) {
        result =
          origin_price * 0.001 * KRW +
          engine * 3.2 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1500 && engine <= 1800) {
        result =
          origin_price * 0.001 * KRW +
          engine * 3.5 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 1800 && engine <= 2300) {
        result =
          origin_price * 0.001 * KRW +
          engine * 4.8 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 2300 && engine <= 3000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 5 * EUR +
          util +
          100000 +
          2100 * KRW;
      } else if (engine > 3000) {
        result =
          origin_price * 0.001 * KRW +
          engine * 5.7 * EUR +
          util +
          100000 +
          2100 * KRW;
      }
    }
  }
  if (stateCity === 2) result = result + 200000;
  return Math.floor(result);
}
