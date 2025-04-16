import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const countNomer = await prisma.car_info_changes.groupBy({
    by: ["vehicle_id"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 1,
  });
  return NextResponse.json({ count: countNomer[0]._count.id });
}
