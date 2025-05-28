export function CalculationUtilSbor(year: number, engine: number) {
  let res = 0;
  if (year < 3) {
    if (engine <= 3000) {
      res = 20000 * 0.17;
    } else if (engine > 3000 && engine <= 3500) {
      res = 20000 * 107.67;
    } else {
      res = 20000 * 137.11;
    }
  } else {
    if (engine <= 3000) {
      res = 20000 * 0.26;
    } else if (engine > 3000 && engine <= 3500) {
      res = 20000 * 164.84;
    } else {
      res = 20000 * 180.24;
    }
  }
  return res;
}
