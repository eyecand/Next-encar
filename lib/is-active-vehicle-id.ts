import { prisma } from "@/prisma/prisma-client";

export const isActiveVehicleId = async (id: string) => {
  const activeLots = await prisma.active_lots.findFirst({
    where: {
      encar: {
        id: Number(id),
      },
    },
  });
  const isActive = activeLots === null ? false : true;
  return isActive;
};
