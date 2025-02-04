// import { encarWithParams } from "@/lib/form-select";
import { prisma } from "@/prisma/prisma-client";
// import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// const encarWithParams = Prisma.validator<Prisma.encar_vehiclesDefaultArgs>()({
//   select: {
//     id: true,
//     vehicle_id_on_auction: true,
//     extend_warranty: true,
//     diagnosis_passed: true,
//     pre_verified: true,
//     details: {
//       select: {
//         id: true,
//         form_year: true,
//         origin_price: true,
//         mileage: true,
//         engine_displacement: true,
//         model: true,
//         makes: true,
//         body: true,
//         colours: true,
//         fuel: true,
//         grades: true,
//         transmission: true,
//       },
//     },
//     photos: true,
//   },
// });

// export type encarType = Prisma.encar_vehiclesGetPayload<typeof encarWithParams>;
// export type encarProps = Prisma.PromiseReturnType<typeof GET>;

export async function GET() {
  // BigInt.prototype.toJSON = function () {
  //   return this.toString();
  // };

  const vehicles = await prisma.encar_vehicles.findMany({
    select: {
      id: true,
      vehicle_id_on_auction: true,
      extend_warranty: true,
      diagnosis_passed: true,
      pre_verified: true,
      photos: {
        select: {
          id: true,
          url: true,
        },
      },
      details: {
        select: {
          id: true,
          form_year: true,
          origin_price: true,
          mileage: true,
          engine_displacement: true,
          model: {
            select: {
              model_english: true,
            },
          },
          makes: {
            select: {
              make_english: true,
            },
          },
          body: {
            select: {
              body_type_english: true,
            },
          },
          colours: {
            select: {
              color_english: true,
            },
          },
          fuel: {
            select: {
              fuel_english: true,
            },
          },
          grades: {
            select: {
              grade_english: true,
            },
          },
          transmission: {
            select: {
              transmission_english: true,
            },
          },
        },
      },
    },
    take: 2,
  });
  return NextResponse.json(vehicles);
}
// const json = (param: any): any => {
//   return JSON.stringify(
//     param,
//     (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
//   );
// };
