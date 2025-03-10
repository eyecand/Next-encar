import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const makes = await prisma.car_info_changes.groupBy({
    by: ["vehicle_id"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });
  //   if (makes.length > 0) {
  //     const mostFrequentGroupId = makes[0];
  //     console.log(
  //       "Most frequent vehicle_id:",
  //       mostFrequentGroupId.vehicle_id,
  //       "with",
  //       mostFrequentGroupId._count.id,
  //       "records"
  //     );
  //     return NextResponse.json(mostFrequentGroupId._count.id);
  //   } else {
  //     console.log("No records found.");
  //     return null;
  //   }

  return NextResponse.json({ count: makes[0]._count.id });
}
