import { CarInfo, LoadingSpinner, SliderCarPage } from "@/components/shared";
import Breadcrumb from "@/components/shared/breadcrumb";
import SimilarCars from "@/components/shared/similar-car/similar-car";
import { Options } from "@/components/shared/vehicle-id-page/options";
import { detectedDate } from "@/lib/detected-date";
import { findCBR } from "@/lib/find-cbr";
import { findVehicleSimilar } from "@/lib/find-vehicle-similar";
import { findVehicleId } from "@/lib/find-vehicles-id";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { prisma } from "@/prisma/prisma-client";
interface ProductPageProps {
  makes: string;
  model: string;
  evolutions: string;
  id: string;
}
type Props = {
  params: Promise<ProductPageProps>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id, evolutions, makes, model } = await params;
  // fetch data
  const imageSercev = await prisma.active_lots.findFirst({
    where: { encar: { id: Number(id.replace("uid-", "")) } },
    select: {
      encar: {
        select: {
          photos: {
            select: {
              s3_images: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
    },
  });
  let previewPhoto:
    | string
    | { s3_images: { url: string } | null }[]
    | undefined = "/12.png";
  if (imageSercev) {
    previewPhoto = imageSercev.encar.photos.filter((i) => {
      if (i.s3_images?.url) i.s3_images?.url.includes("001");
    })
      ? imageSercev.encar.photos.filter((i) =>
          i.s3_images?.url.includes("001")
        )[0].s3_images?.url
      : imageSercev.encar.photos[0].s3_images?.url;
  }

  // // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Автомобиль ${makes} ${model} ${evolutions} из Южной Кореи (Encar)`,
    description: `Купить/привезти автомобиль ${makes} ${model} ${evolutions} из Южной Кореи (Encar) (недорого)`,
    openGraph: {
      images: [String(previewPhoto), ...previousImages],
    },
  };
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
      label: decodeURIComponent(makes),
      href: `/${makes}/`,
    },
    {
      label: decodeURIComponent(model),
      href: `/${makes}/${model}`,
    },
    {
      label: decodeURIComponent(evolutions).replaceAll("%", " "),
      href: `/${makes}/${model}/${evolutions}`,
    },
  ];
  const vehicleId = await findVehicleId(carId);
  const vehicleSimilar = await findVehicleSimilar({
    makes: String(vehicleId?.details?.makes.make_short_name),
    model: String(vehicleId?.details?.model.model_short_name),
    date: String(vehicleId?.details?.release_date),
  });
  const { cbrMap } = await findCBR();
  if (!vehicleId) {
    return notFound();
  }
  return (
    <>
      <div className="mx-auto flex flex-col flex-1 min-h-screen px-5 max-w-7xl mt-32 lg:mt-44">
        <div className="flex flex-col md:flex-row md:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <span className="text-sm text-muted-foreground">
            {detectedDate(vehicleId.created_at)}
          </span>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
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
              inspections={vehicleId.inspections}
              EUR={Number(cbrMap.get("EUR"))}
              KRW={Number(cbrMap.get("KRW"))}
              broker={Number(cbrMap.get("broker"))}
              fraht={Number(cbrMap.get("fraht"))}
              k_krw={Number(cbrMap.get("K_KRW"))}
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
