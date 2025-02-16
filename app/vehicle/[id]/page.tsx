import { CarInfo, SliderCarPage } from "@/components/shared";
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
    include: {
      details: {
        include: {
          model: true,
          makes: true,
          fuel: true,
          grades: true,
          transmission: true,
          colours: true,
          body: true,
        },
      },
      photos: {
        select: {
          url: true,
        },
      },
    },
  });
  if (!car) {
    return notFound();
  }
  return (
    <div className="mx-auto px-5 max-w-[1280px] mt-24">
      <div className=" py-5 flex flex-col">
        <h1 className="font-bold text-lg md:text-3xl">
          Продажа {car.details?.makes.make_short_name}{" "}
          {car.details?.model.model_short_name}, {car.details?.form_year} года
        </h1>
      </div>
      <section className="  pt-4 flex md:flex-row flex-col mb-24">
        <SliderCarPage imgSrc={car.photos} />
        <CarInfo
          price={car.details?.origin_price}
          fuel={car.details?.fuel.fuel_english}
          transmission={car.details?.transmission.transmission_english}
          mileage={car.details?.mileage}
          body={car.details?.body.body_type_english}
          grades={car.details?.grades.grade_english}
          engine={car.details?.engine_displacement}
        />
      </section>
    </div>
  );
}
