import { prisma } from "@/prisma/prisma-client";
import { currency_rates } from "@prisma/client";

export const findCBR = async (): Promise<ReturnProps> => {
  const cbr = await prisma.currency_rates.findMany({
    select: {
      char_code: true,
      name: true,
      value: true,
    },
  });
  return { cbr };
};

interface ReturnProps {
  cbr: currency_rates[];
}
