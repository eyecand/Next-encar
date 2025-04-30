import { prisma } from "@/prisma/prisma-client";

import { NextResponse } from "next/server";

export async function GET() {
  // let makes = "Kia";
  // const first = await prisma.active_lots.findMany({
  //   where: {
  //     encar: {
  //       details: { makes: { make_short_name: makes } },
  //       accident_details: { some: { insurance_benefit: { gte: 1000000 } } },
  //     },
  //   },
  //   select: {
  //     encar: {
  //       select: {
  //         accident_details: true,
  //         details: { select: { makes: { select: { make_short_name: true } } } },
  //       },
  //     },
  //   },
  //   take: 100,
  // });

  const first = await prisma.active_lots.count({
    where: {
      encar: {
        details: {
          form_year: { gte: 2020, lte: 2025 },
          makes: { make_short_name: "Others" },
        },
      },
    },
  });

  return NextResponse.json(first);
}
// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

// const json = (param: any): any => {
//   return JSON.stringify(
//     param,
//     (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
//   );
// };
