import { Api } from "@/services/api-client";
import React, { useEffect } from "react";

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
  useEffect(() => {
    async function getCounts() {
      try {
        const cachedData = localStorage.getItem("maxCountData");
        const cachedTime = localStorage.getItem("maxCountData_time");
        const CACHE_EXPIRATION_TIME = 60 * 1000; // 1 минута

        if (
          cachedData &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_EXPIRATION_TIME
        ) {
          const parsedData = JSON.parse(cachedData) as Props;
          setCount(parsedData);
          return;
        }

        const maxCount = await Api.count.getMaxCountNomer();
        setCount(maxCount);
        localStorage.setItem("maxCountData", JSON.stringify(maxCount));
        localStorage.setItem("maxCountData_time", Date.now().toString());
      } catch (error) {
        console.error(error);
      }
    }
    getCounts();
  }, []);

  // React.useEffect(() => {
  //   async function getCounts() {
  //     try {
  //       const maxCount = await Api.count.getMaxCount();
  //       setCount(maxCount);
  //       console.log("maxCount", maxCount);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getCounts();
  // }, []);
  const currentCount = count?.count ? count.count : 1;
  for (let i = 1; i <= currentCount; i++) {
    optionCounts.push({ value: String(i), label: String(i) });
  }
  return { optionCounts };
};
