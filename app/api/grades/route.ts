import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") || "";
  const model = request.nextUrl.searchParams.get("model") || "";

  const grades = await prisma.vehicle_details.findMany({
    where: {
      makes: {
        make_english: query,
      },
      model: {
        model_english: model,
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
