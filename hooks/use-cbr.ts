import { currency_rates } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCBR = (): ReturnProps => {
  const [cbr, setCBR] = useState<Map<string, Decimal | null>>();
  useEffect(() => {
    async function getCBR() {
      try {
        const allCBR = (
          await axios.get<currency_rates[]>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cbr`
          )
        ).data;
        const cbrMap = new Map(
          allCBR.map((item) => [item.char_code, item.value])
        );
        setCBR(cbrMap);
      } catch (error) {
        console.error("Error fetching CBR data:", error);
      }
    }
    getCBR();
  }, []);
  return { cbr };
};
interface ReturnProps {
  cbr: Map<string, Decimal | null> | undefined;
}
