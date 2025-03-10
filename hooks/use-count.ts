import { Api } from "@/services/api-client";
import React from "react";

interface ReturnProps {
  optionCounts: Option[];
}
interface Option {
  value: string | null;
  label: string | null;
}
type Props = {
  count: number;
};
export const useCounts = (): ReturnProps => {
  const [count, setCount] = React.useState<Props>();

  const optionCounts: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];

  React.useEffect(() => {
    async function getCounts() {
      try {
        const maxCount = await Api.count.getMaxCount();
        setCount(maxCount);
        console.log("maxCount", maxCount);
      } catch (error) {
        console.log(error);
      }
    }
    getCounts();
  }, []);
  const currentCount = count?.count ? count.count : 1;
  for (let i = 1; i <= currentCount; i++) {
    optionCounts.push({ value: String(i), label: String(i) });
  }
  //   fuels.map((item) => {
  //     return optionFuels.push({
  //       value: item.fuel_english,
  //       label: detectFuels(item.fuel_english || ""),
  //     });
  //   });
  return { optionCounts };
};
