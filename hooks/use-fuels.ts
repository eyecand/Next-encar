"use client";
import { detectFuels } from "@/lib/detect-fuels";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
type FuelProps = {
  fuel_english: string | null;
};
interface ReturnProps {
  optionFuels: Option[];
}
interface Option {
  value: string | null;
  label: string | null;
}

const FUEL_DATA_KEY = "fuelData";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 часа
export const useFuels = (): ReturnProps => {
  const [fuels, setFuels] = useState<FuelProps[]>([]);

  const optionFuels: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];

  useEffect(() => {
    async function getFuels() {
      try {
        const cachedData = localStorage.getItem(FUEL_DATA_KEY);
        const cachedTime = localStorage.getItem(`${FUEL_DATA_KEY}_time`);

        if (
          cachedData &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_EXPIRATION_TIME
        ) {
          setFuels(JSON.parse(cachedData) as FuelProps[]);
          return;
        }

        const fuelsAll = await Api.fuels.getFuels();
        setFuels(fuelsAll);

        localStorage.setItem(FUEL_DATA_KEY, JSON.stringify(fuelsAll));
        localStorage.setItem(`${FUEL_DATA_KEY}_time`, Date.now().toString());
      } catch (error) {
        console.error(error);
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
