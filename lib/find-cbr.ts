import { prisma } from "@/prisma/prisma-client";
import { Decimal } from "@prisma/client/runtime/library";

export const findCBR = async (): Promise<ReturnProps> => {
  const cbr = await prisma.currency_rates.findMany({
    select: {
      char_code: true,
      name: true,
      value: true,
    },
  });
  const cbrMap = new Map(cbr.map((item) => [item.char_code, item.value]));
  return { cbrMap };
};

interface ReturnProps {
  cbrMap: Map<string, Decimal | null>;
}
