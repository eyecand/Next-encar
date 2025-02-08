import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const years = await prisma.vehicle_details.findMany({
    distinct: ["form_year"],
    select: {
      form_year: true,
    },
    orderBy: {
      form_year: "desc",
    },
  });

  return NextResponse.json(years);
}
