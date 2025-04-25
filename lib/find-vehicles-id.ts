import { prisma } from "@/prisma/prisma-client";

export const findVehicleId = async (id: string) => {
  const vahicleId = await prisma.encar_vehicles.findFirst({
    where: { id: Number(id) },
    include: {
      advertisements: { select: { price: true } },
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
      // номер машины при каждом владельце
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

      details: {
        select: {
          colours: { select: { color_english: true } },
          form_year: true,
          engine_displacement: true,
          mileage: true,
          fuel: {
            select: {
              fuel_english: true,
            },
          },
          makes: { select: { make_short_name: true } },
          model: { select: { model_short_name: true } },
          grades: {
            select: { grade_english: true },
          },
          transmission: { select: { transmission_english: true } },
        },
      },
      photos: {
        select: {
          url: true,
        },
      },
    },
  });

  return vahicleId;
};
