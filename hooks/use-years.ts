import { Api } from "@/services/api-client";
import { vehicle_details } from "@prisma/client";
import React from "react";

interface ReturnProps {
  optionYears: Option[];
  yearsLoading: boolean;
}
interface Option {
  value: string | null;
  label: string | null;
}
export const useYears = (): ReturnProps => {
  const [years, setYears] = React.useState<vehicle_details[]>([]);
  const [yearsLoading, setYearsLoading] = React.useState(false);
  const optionYears: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  React.useEffect(() => {
    async function getYears() {
      try {
        setYearsLoading(true);
        const yearsAll = await Api.years.getYears();
        setYears(yearsAll);
      } catch (error) {
        console.log(error);
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
