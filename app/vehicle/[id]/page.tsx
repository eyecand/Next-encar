import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = await params;
  const { id } = paramsId;
  const car = await prisma.encar_vehicles.findFirst({
    where: { id: Number(id) },
    include: { details: true, photos: true },
  });
  if (!car) {
    return notFound();
  }
  return (
    <div className="mx-auto max-w-[1280px] mt-40">
      <h1>Car Page {id}</h1>
      <span>{car.vehicle_id_on_auction}</span>
      <div>{car.details?.mileage}</div>
    </div>
  );
}
