import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") || "";

  const model = await prisma.vehicle_details.findMany({
    where: {
      makes: {
        make_english: query,
      },
    },
    distinct: ["model_id"],
    select: {
      model: {
        select: {
          model_english: true,
        },
      },
    },
  });

  return NextResponse.json(model);
}
