import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const makes = request.nextUrl.searchParams.get("makes") || "";
  const model = request.nextUrl.searchParams.get("model") || "";

  const grades = await prisma.vehicle_details.findMany({
    where: {
      makes: {
        make_short_name: makes,
      },
      model: {
        model_short_name: model,
      },
    },
    distinct: ["grade_id"],
    select: {
      grades: {
        select: {
          grade_english: true,
        },
      },
    },
  });

  return NextResponse.json(grades);
}
