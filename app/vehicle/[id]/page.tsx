import { CarInfo, SliderCarPage } from "@/components/shared";
import { detectMake } from "@/components/shared/form-korea-cars/first-line/lib";
import ShareButton from "@/components/shared/ShareButton";
import YandexMetrika from "@/components/shared/yandex-metrika";
import { detectedDate } from "@/lib/detected-date";
import { findCBR } from "@/lib/find-cbr";
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
  const { cbr } = await findCBR();
  const EUR = cbr.find((item) => item.char_code === "EUR")?.value;
  const KRW = cbr.find((item) => item.char_code === "KRW")?.value;
  const fraht = cbr.find((item) => item.char_code === "fraht")?.value;
  const broker = cbr.find((item) => item.char_code === "broker")?.value;
  const k_krw = cbr.find((item) => item.char_code === "K_KRW")?.value;
  if (!vehicleId) {
    return notFound();
  }
  const shareUrl = `https://autofish.ru/vehicle/${id}`;
  const shareTitle = "Добый день! ";
  const shareDescription = "Просматриваю это объявление.";

  return (
    <>
      <div className="mx-auto px-5 max-w-7xl mt-24 lg:mt-24">
        <div className=" py-5 flex items-baseline">
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
              EUR={Number(EUR)}
              KRW={Number(KRW)}
              broker={Number(broker)}
              fraht={Number(fraht)}
              k_krw={Number(k_krw)}
            />
          </section>
        </Suspense>
      </div>
      {/* <YandexMetrika /> */}
    </>
  );
}
