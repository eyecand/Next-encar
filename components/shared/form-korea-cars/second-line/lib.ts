import { tpl } from "./model";

export function detectTransmission(transmission: string) {
  const currentTransmission: tpl = {
    Otto: "Авто",
    Manual: "Механика",
    CVT: "Вариатор",
    ["passivity, Semioto"]: "Робот",
    passivity: "Робот",
    Semioto: "Робот",
  };
  return currentTransmission[transmission];
}
