import { CarInfo, SliderCarPage } from "@/components/shared";
import { detectMake } from "@/components/shared/form-korea-cars/first-line/lib";
import ShareButton from "@/components/shared/ShareButton";
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
  const shareUrl = `https://autofish.ru/vehicle/${id}`;
  const shareTitle = "Добый день! ";
  const shareDescription = "Просматриваю это объявление.";
  return (
    <div className="mx-auto px-5 max-w-[1280px] mt-24">
      <div className=" py-5 flex items-baseline">
        <h1 className="font-bold text-lg md:text-3xl">
          {detectMake(String(vehicleId?.details?.makes.make_short_name))}{" "}
          {vehicleId?.details?.model.model_short_name}
        </h1>
        <ShareButton
          url={shareUrl}
          title={shareTitle}
          description={shareDescription}
        />
      </div>

      <Suspense fallback={<p>Loading</p>}>
        <section className="  pt-4 flex md:flex-row flex-col mb-24">
          <SliderCarPage imgSrc={vehicleId.photos} />

          <CarInfo
            id={id}
            auctionId={vehicleId.vehicle_id_on_auction}
            advertisements={vehicleId.advertisements}
            details={vehicleId.details}
            accident={vehicleId.accident}
            accident_details={vehicleId.accident_details}
            diagnostics={vehicleId.diagnostics}
            vehicle_plate_number={vehicleId.vehicle_plate_number}
            sell_type={vehicleId.lib_sell_types.sell_type}
          />
        </section>
      </Suspense>
    </div>
  );
}
