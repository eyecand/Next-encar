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
  const first = await prisma.active_lots.findMany({
    where: {
      encar: { id: 87300 },
    },
  });
  return NextResponse.json(first);
}
// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };
// const first = await prisma.encar_vehicles.findFirst({
//   where: {
//     id: 75475,
//   },
//   include: {
//     accident_details: true,
//   },
// });
// const vehicles = await prisma.active_lots.findMany({
//   where: {
//     AND: [
//       {
//         encar: {
//           diagnostics: {
//             diagnosis: {
//               some: {
//                 diagnosis_result_id: 2,
//               },
//             },
//           },
//         },
//       },
//       { encar: { diagnostics: { isNot: null } } },
//     ],
//   },
//   select: {
//     encar: {
//       select: {
//         id: true,
//       },
//     },
//   },
// });
/////////////////////////////////////////////////////////
// const makes = request.nextUrl.searchParams.get("makes") || null;
// if (makes) {
//   const model = await prisma.lib_models.findMany({
//     distinct: ["model_short_name"],
//     where: {
//       details: {
//         some: {
//           makes: {
//             make_short_name: makes,
//           },
//         },
//       },
//     },
//     select: {
//       model_short_name: true,
//     },
//   });
//   return NextResponse.json(model);
// } else {
//   const model = await prisma.lib_models.findMany({
//     distinct: ["model_short_name"],

//     select: {
//       model_short_name: true,
//     },
//   });
//   return NextResponse.json(model);
// }
/////////////////////////////////////////////////////////

// const vehicles = await prisma.active_lots.findMany({
//   select: {
//     encar: {
//       select: {
//         vehicle_id_on_auction: true,
//       },
//     },
//   },
// });
// return NextResponse.json(vehicles);

// const json = (param: any): any => {
//   return JSON.stringify(
//     param,
//     (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
//   );
// };
