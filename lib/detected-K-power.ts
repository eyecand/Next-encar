export function DetectedKPower(power: number) {
  let K = 0;
  if (power > 90 && power <= 150) {
    K = 61;
  } else if (power > 150 && power <= 200) {
    K = 583;
  } else if (power > 200 && power <= 300) {
    K = 955;
  } else if (power > 300 && power <= 400) {
    K = 1628;
  } else if (power > 400 && power <= 500) {
    K = 1685;
  } else if (power > 500) {
    K = 1740;
  }
  return K;
}
