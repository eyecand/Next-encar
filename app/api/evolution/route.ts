import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const makes = request.nextUrl.searchParams.get("makes") || "";
  const model = request.nextUrl.searchParams.get("model") || "";

  const modelsGrouped = await prisma.vehicle_details.groupBy({
    by: ["model_id"],
    where: {
      encar: {
        active: {
          isNot: null,
        },
      },
      makes: makes
        ? {
            make_short_name: makes,
          }
        : undefined,
      model: model
        ? {
            model_short_name: model,
          }
        : undefined,
    },
  });

  const modelIds = modelsGrouped.map((m) => m.model_id);
  const evolution = await prisma.lib_models.findMany({
    where: {
      id: {
        in: modelIds,
      },
    },
    select: {
      model_english: true,
    },
  });
  return NextResponse.json(evolution);
}
