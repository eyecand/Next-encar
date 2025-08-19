import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
const DEFAULT_MIN_YEARS = 2000;
const DEFAULT_MAX_YEARS = new Date().getFullYear();
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
      release_date: {
        gte: new Date(`${DEFAULT_MIN_YEARS}-01-01T00:00:00.000Z`),
        lte: new Date(`${DEFAULT_MAX_YEARS}-12-31T23:59:59.999Z`),
      },
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
