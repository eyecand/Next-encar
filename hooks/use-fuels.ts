import { Api } from "@/services/api-client";
import { lib_fuels } from "@prisma/client";
import React from "react";

interface ReturnProps {
  optionFuels: Option[];
}
interface Option {
  value: string | null;
  label: string | null;
}
export type tpl = {
  [key: string]: string;
};
export function detectFuels(fuel: string) {
  const currentFuels: tpl = {
    Gasoline: "Бензин",
    ["LPG (Purchased by the public)"]: "СУГ(LPG)",
    Diesel: "Дизель",
    Electricity: "Электричество",
    ["Gasoline+Electric"]: "Бензин + Электричество",
    Hydrogen: "Водород",
    ["Gasoline+LPG"]: "Бензин + СНГ",
    ["LPG + Electric"]: "СНГ + электричество",
    Other: "Другое",
    ["Gasoline+CNG"]: "Бензин + СНГ",
    CNG: "СПГ",
  };
  return currentFuels[fuel];
}
export const useFuels = (): ReturnProps => {
  const [fuels, setFuels] = React.useState<lib_fuels[]>([]);

  const optionFuels: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  React.useEffect(() => {
    async function getFuels() {
      try {
        const fuelsAll = await Api.fuels.getFuels();
        setFuels(fuelsAll);
      } catch (error) {
        console.log(error);
      }
    }
    getFuels();
  }, []);
  fuels.map((item) => {
    return optionFuels.push({
      value: item.fuel_english,
      label: detectFuels(item.fuel_english || ""),
    });
  });
  return { optionFuels };
};
