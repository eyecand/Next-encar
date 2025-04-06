import { CarInfo, SliderCarPage } from "@/components/shared";
import { findVehicleId } from "@/lib/find-vehicles-id";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = await params;
  const { id } = paramsId;
  const vehicleId = await findVehicleId(id);
  if (!vehicleId) {
    return notFound();
  }
  return (
    <div className="mx-auto px-5 max-w-[1280px] mt-24">
      <div className=" py-5 flex flex-col">
        <h1 className="font-bold text-lg md:text-3xl">
          {vehicleId?.details?.makes.make_short_name}{" "}
          {vehicleId?.details?.model.model_short_name}
        </h1>
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <section className="  pt-4 flex md:flex-row flex-col mb-24">
          <SliderCarPage imgSrc={vehicleId.photos} />

          <CarInfo
            details={vehicleId.details}
            _count={vehicleId._count}
            accident={vehicleId.accident}
            accident_details={vehicleId.accident_details}
            diagnostics={vehicleId.diagnostics}
            vehicle_plate_number={vehicleId.vehicle_plate_number}
          />
        </section>
      </Suspense>
    </div>
  );
}
