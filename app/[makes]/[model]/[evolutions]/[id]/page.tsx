import { CarInfo, SliderCarPage } from "@/components/shared";
import Breadcrumb from "@/components/shared/breadcrumb";
import SimilarCars from "@/components/shared/similar-car/similar-car";
import { Options } from "@/components/shared/vehicle-id-page/options";
import { detectedDate } from "@/lib/detected-date";
import { findCBR } from "@/lib/find-cbr";
import { findVehicleSimilar } from "@/lib/find-vehicle-similar";
import { findVehicleId } from "@/lib/find-vehicles-id";
import { notFound } from "next/navigation";
import { Suspense } from "react";
interface ProductPageProps {
  makes: string;
  model: string;
  evolutions: string;
  id: string;
}
export default async function CarPage({
  params,
}: {
  params: Promise<ProductPageProps>;
}) {
  const { id, evolutions, makes, model } = await params;

  let carId = "";
  if (id.startsWith("uid-")) {
    carId = id.replace("uid-", "");
  }
  const breadcrumbItems = [
    {
      label: makes,
      href: `/${makes}/`,
    },
    {
      label: decodeURIComponent(model),
      href: `/${makes}/${model}`,
    },
    {
      label: decodeURIComponent(evolutions),
      href: `/${makes}/${model}/${evolutions}`,
    },
  ];
  const vehicleId = await findVehicleId(carId);
  const vehicleSimilar = await findVehicleSimilar({
    makes: String(vehicleId?.details?.makes.make_short_name),
    model: String(vehicleId?.details?.model.model_short_name),
    date: String(vehicleId?.details?.release_date),
  });
  const { cbr } = await findCBR();
  const EUR = cbr.find((item) => item.char_code === "EUR")?.value;
  const KRW = cbr.find((item) => item.char_code === "KRW")?.value;
  const fraht = cbr.find((item) => item.char_code === "fraht")?.value;
  const broker = cbr.find((item) => item.char_code === "broker")?.value;
  const k_krw = cbr.find((item) => item.char_code === "K_KRW")?.value;
  if (!vehicleId) {
    return notFound();
  }
  return (
    <>
      <div className="mx-auto px-5 max-w-7xl mt-32 lg:mt-44">
        {/* <div className=" py-5 flex items-baseline">
          <h1 className="font-bold text-lg md:text-3xl">
            {detectMake(String(vehicleId?.details?.makes.make_short_name))}{" "}
            {vehicleId?.details?.model.model_short_name === "Canival"
              ? "Carnival"
              : vehicleId?.details?.model.model_short_name}
          </h1>
          <ShareButton
            url={shareUrl}
            title={shareTitle}
            description={shareDescription}
          />
          <div className=" flex flex-1 justify-end">
            <div className="text-[14px] sm:text-[16px]">
              Дата: {detectedDate(vehicleId.created_at)}
            </div>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <span className="text-sm text-muted-foreground">
            {detectedDate(vehicleId.created_at)}
          </span>
        </div>

        <Suspense fallback={<p>Loading</p>}>
          <section className=" flex md:flex-row flex-col mb-12">
            <SliderCarPage imgSrc={vehicleId.photos} />

            <CarInfo
              id={carId}
              auctionId={vehicleId.vehicle_id_on_auction}
              advertisements={vehicleId.advertisements}
              details={vehicleId.details}
              accident={vehicleId.accident}
              accident_details={vehicleId.accident_details}
              diagnostics={vehicleId.diagnostics}
              vehicle_plate_number={vehicleId.vehicle_plate_number}
              sell_type={vehicleId.lib_sell_types.sell_type}
              EUR={Number(EUR)}
              KRW={Number(KRW)}
              broker={Number(broker)}
              fraht={Number(fraht)}
              k_krw={Number(k_krw)}
            />
          </section>
          {/* Options */}
          <Options options={vehicleId.vehicle_options} />
          <SimilarCars
            vehicleSimilar={vehicleSimilar}
            year={new Date(
              String(vehicleId?.details?.release_date)
            ).getFullYear()}
          />
        </Suspense>
      </div>
      {/* <YandexMetrika /> */}
    </>
  );
}
