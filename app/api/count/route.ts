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
  return NextResponse.json({ count: makes[0]._count.id });
}
