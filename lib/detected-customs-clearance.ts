export function DetectedCustomsClearance(price: number) {
  let stavka = 0;
  if (price < 200000) {
    stavka = 1067;
  } else if (price >= 200000 && price < 450000) {
    stavka = 2134;
  } else if (price >= 450000 && price < 1200000) {
    stavka = 4269;
  } else if (price >= 1200000 && price < 2700000) {
    stavka = 11746;
  } else if (price >= 2700000 && price < 4200000) {
    stavka = 16524;
  } else if (price >= 4200000 && price < 5500000) {
    stavka = 21344;
  } else if (price >= 5500000 && price < 7000000) {
    stavka = 27540;
  } else if (price >= 7000000) {
    stavka = 30000;
  }
  return stavka;
}
