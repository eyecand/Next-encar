export function NoProhodCar(year: string) {
  let x = false;
  const ycurrent = new Date().getFullYear();
  const mcurrent = new Date().getMonth();
  const dateCar = new Date(year);
  const yCar = dateCar.getFullYear();
  const mCar = dateCar.getMonth();
  if (yCar === ycurrent - 2) {
    if (mCar <= mcurrent) x = true;
  } else if (yCar === ycurrent - 3) {
    if (mCar > mcurrent) x = true;
  }
  return x;
}

// Определяет машину младше 3-х лет, которой до проходной осталось меньше года
