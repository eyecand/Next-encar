import { Prisma } from "@prisma/client";

export const encarWithParams =
  Prisma.validator<Prisma.encar_vehiclesDefaultArgs>()({
    select: {
      id: true,
      vehicle_id_on_auction: true,
      extend_warranty: true,
      diagnosis_passed: true,
      pre_verified: true,
      details: {
        select: {
          id: true,
          form_year: true,
          origin_price: true,
          mileage: true,
          engine_displacement: true,
          model: true,
          makes: true,
          body: true,
          colours: true,
          fuel: true,
          grades: true,
          transmission: true,
        },
      },
      photos: true,
    },
  });
