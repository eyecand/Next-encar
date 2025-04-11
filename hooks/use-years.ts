import { Api } from "@/services/api-client";
import React, { useEffect } from "react";

interface ReturnProps {
  optionYears: Option[];
  yearsLoading: boolean;
}
interface Option {
  value: string | null;
  label: string | null;
}
type YearProps = {
  form_year: number;
};
const YEAR_DATA_KEY = "yearData";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 часа
export const useYears = (): ReturnProps => {
  const [years, setYears] = React.useState<YearProps[]>([]);
  const [yearsLoading, setYearsLoading] = React.useState(false);
  const optionYears: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  useEffect(() => {
    async function getYears() {
      try {
        setYearsLoading(true);

        const cachedData = localStorage.getItem(YEAR_DATA_KEY);
        const cachedTime = localStorage.getItem(`${YEAR_DATA_KEY}_time`);

        if (
          cachedData &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_EXPIRATION_TIME
        ) {
          setYears(JSON.parse(cachedData) as YearProps[]);
          return;
        }

        const yearsAll = await Api.years.getYears();
        setYears(yearsAll);

        localStorage.setItem(YEAR_DATA_KEY, JSON.stringify(yearsAll));
        localStorage.setItem(`${YEAR_DATA_KEY}_time`, Date.now().toString());
      } catch (error) {
        console.error(error);
      } finally {
        setYearsLoading(false);
      }
    }

    getYears();
  }, []);
  years.map((item) => {
    return optionYears.push({
      value: String(item.form_year),
      label: String(item.form_year),
    });
  });
  return { optionYears, yearsLoading };
};
