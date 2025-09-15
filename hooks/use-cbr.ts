import { currency_rates } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCBR = (): ReturnProps => {
  const [cbr, setCBR] = useState<currency_rates[] | undefined>([]);
  useEffect(() => {
    async function getCBR() {
      try {
        const allCBR = (
          await axios.get<currency_rates[]>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cbr`
          )
        ).data;
        setCBR(allCBR);
      } catch (error) {
        console.error("Error fetching CBR data:", error);
      }
    }
    getCBR();
  }, []);
  return { cbr };
};
interface ReturnProps {
  cbr: currency_rates[] | undefined;
}
