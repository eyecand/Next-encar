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
      diagnostics: {
        select: {
          actual_diagnostic_date: true,
          diagnosis: {
            select: {
              diagnosis_code_id: true,
              diagnosis_result_id: true,
              comments: {
                select: {
                  comment_english: true,
                },
              },
            },
          },
        },
      },
      // номер машины при каждом владеьце
      car_info: { select: { date: true, plate_number: true } },
      // затраты на ремонт по страховке
      accident_details: {
        select: {
          date: true,
          insurance_benefit: true,
          labor_cost: true,
          painting_cost: true,
          part_cost: true,
          type: true,
        },
      },
      // количество аварий и утопленник
      accident: {
        select: {
          current_accident_count: true,
          other_accident_count: true,
          flood_total_loss_count: true,
          flood_part_loss_count: true,
          robber_count: true,
          business: true,
          government: true,
          loan: true,
        },
      },
      // количество владельцев
      _count: { select: { car_info: { where: { vehicle_id: +id } } } },

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
          {car.details?.makes.make_short_name}{" "}
          {car.details?.model.model_short_name}
        </h1>
      </div>
      <section className="  pt-4 flex md:flex-row flex-col mb-24">
        <SliderCarPage imgSrc={car.photos} />
        <CarInfo
          make={car.details?.makes.make_short_name}
          model={car.details?.model.model_short_name}
          years={car.details?.form_year}
          price={car.details?.origin_price}
          fuel={car.details?.fuel.fuel_english}
          transmission={car.details?.transmission.transmission_english}
          mileage={car.details?.mileage}
          grades={car.details?.grades.grade_english}
          engine={car.details?.engine_displacement}
          changeCount={car._count.car_info}
          accident={car.accident}
          accident_details={car.accident_details}
          plate_number={car.vehicle_plate_number}
          diagnosis={car.diagnostics}
        />
      </section>
    </div>
  );
}
