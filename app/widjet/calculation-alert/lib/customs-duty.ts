export function CustomsDuty(
  origin_price: number,
  KRW: number,
  EUR: number,
  engine: number,
  fuel: string,
  year: number,
  power: number,
  K: number
) {
  let result = 0;

  if (fuel === "Electricity") {
    result =
      origin_price * 0.001 * KRW * 0.15 +
      power * K +
      (origin_price * 0.001 * KRW +
        origin_price * 0.001 * KRW * 0.15 +
        power * K) *
        0.2;
  } else {
    if (year < 3) {
      if (origin_price * 0.001 * KRW < 8500 * EUR) {
        if (origin_price * 0.001 * KRW * 0.54 >= engine * 2.5 * EUR) {
          result = origin_price * 0.001 * KRW * 0.54;
        } else {
          result = engine * 2.5 * EUR;
        }
      } else if (
        origin_price * 0.001 * KRW > 8500 * EUR &&
        origin_price * 0.001 * KRW < 16700 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 3.5 * EUR) {
          result = origin_price * 0.001 * KRW * 0.48;
        } else {
          result = engine * 3.5 * EUR;
        }
      } else if (
        origin_price * 0.001 * KRW > 16700 * EUR &&
        origin_price * 0.001 * KRW < 42300 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 5.5 * EUR) {
          result = origin_price * 0.001 * KRW * 0.48;
        } else {
          result = engine * 5.5 * EUR;
        }
      } else if (
        origin_price * 0.001 * KRW > 42300 * EUR &&
        origin_price * 0.001 * KRW < 84500 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 7.5 * EUR) {
          result = origin_price * 0.001 * KRW * 0.48;
        } else {
          result = engine * 7.5 * EUR;
        }
      } else if (
        origin_price * 0.001 * KRW > 84500 * EUR &&
        origin_price * 0.001 * KRW < 169000 * EUR
      ) {
        if (origin_price * 0.001 * KRW * 0.48 >= engine * 15 * EUR) {
          result = origin_price * 0.001 * KRW * 0.48;
        } else {
          result = engine * 15 * EUR;
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
    } else if (year >= 3 && year <= 5) {
      if (engine <= 1000) {
        result = engine * 1.5 * EUR;
      } else if (engine > 1000 && engine <= 1500) {
        result = engine * 1.7 * EUR;
      } else if (engine > 1500 && engine <= 1800) {
        result = engine * 2.5 * EUR;
      } else if (engine > 1800 && engine <= 2300) {
        result = engine * 2.7 * EUR;
      } else if (engine > 2300 && engine <= 3000) {
        result = engine * 3 * EUR;
      } else if (engine > 3000) {
        result = engine * 3.6 * EUR;
      }
    } else if (year > 5) {
      if (engine <= 1000) {
        result = engine * 3 * EUR;
      } else if (engine > 1000 && engine <= 1500) {
        result = engine * 3.2 * EUR;
      } else if (engine > 1500 && engine <= 1800) {
        result = engine * 3.5 * EUR;
      } else if (engine > 1800 && engine <= 2300) {
        result = engine * 4.8 * EUR;
      } else if (engine > 2300 && engine <= 3000) {
        result = engine * 5 * EUR;
      } else if (engine > 3000) {
        result = engine * 5.7 * EUR;
      }
    }
  }
  return Math.floor(result);
}
