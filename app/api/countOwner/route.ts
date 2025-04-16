import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const countOwner = await prisma.owner_changes.groupBy({
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
  return NextResponse.json({ count: countOwner[0]._count.id });
}
