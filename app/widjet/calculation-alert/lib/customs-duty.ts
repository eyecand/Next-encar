export function CustomsDuty(
  origin_price: number,
  KRW: number,
  EUR: number,
  engine: number,
  fuel: string,
  year: number
) {
  const currentYear = new Date().getFullYear();
  const differentYear = currentYear - year;
  let result = 0;
  if (fuel === "Electricity") {
    if (differentYear < 3) {
      result =
        origin_price * 0.001 * KRW * 0.15 +
        (origin_price * 0.001 * KRW + origin_price * 0.001 * KRW * 0.15) * 0.2 +
        3400;
    } else {
      result =
        origin_price * 0.001 * KRW * 0.15 +
        (origin_price * 0.001 * KRW + origin_price * 0.001 * KRW * 0.15) * 0.2 +
        5200;
    }
  } else {
    if (differentYear < 3) {
      if (origin_price * 0.001 * KRW < 8500 * EUR) {
        if (engine <= 2000) {
          result = origin_price * 0.001 * KRW * 0.54 + 3400;
        } else {
          result = engine * 2.5 * EUR + 3400;
        }
      } else {
        if (engine <= 2000) {
          result = origin_price * 0.001 * KRW * 0.48 + 3400;
        } else {
          result = engine * 3.5 * EUR + 3400;
        }
      }
    } else if (differentYear >= 3 && differentYear < 5) {
      if (engine <= 1000) {
        result = engine * 1.5 * EUR + 5200;
      } else if (engine > 1000 && engine <= 1500) {
        result = engine * 1.7 * EUR + 5200;
      } else if (engine > 1500 && engine <= 1800) {
        result = engine * 2.5 * EUR + 5200;
      } else if (engine > 1800 && engine <= 2300) {
        result = engine * 2.7 * EUR + 5200;
      } else if (engine > 2300 && engine <= 3000) {
        result = engine * 3 * EUR + 5200;
      } else if (engine > 3000) {
        result = engine * 3.6 * EUR + 5200;
      }
    } else if (differentYear >= 5) {
      if (engine <= 1000) {
        result = engine * 3 * EUR + 5200;
      } else if (engine > 1000 && engine <= 1500) {
        result = engine * 3.2 * EUR + 5200;
      } else if (engine > 1500 && engine <= 1800) {
        result = engine * 3.5 * EUR + 5200;
      } else if (engine > 1800 && engine <= 2300) {
        result = engine * 4.8 * EUR + 5200;
      } else if (engine > 2300 && engine <= 3000) {
        result = engine * 5 * EUR + 5200;
      } else if (engine > 3000) {
        result = engine * 5.7 * EUR + 5200;
      }
    }
  }
  return Math.floor(result);
}
