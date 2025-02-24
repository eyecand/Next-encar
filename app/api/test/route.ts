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
  //   return this.toString();s
  // };

  const vehicles = await prisma.active_lots.findMany({
    select: {
      encar: {
        select: {},
      },
    },
  });
  return NextResponse.json(vehicles);
}
// const json = (param: any): any => {
//   return JSON.stringify(
//     param,
//     (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
//   );
// };
