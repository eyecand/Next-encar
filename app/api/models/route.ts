import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const makes = request.nextUrl.searchParams.get("makes") || null;

  const model = await prisma.lib_models.findMany({
    distinct: ["model_short_name"],
    where: {
      details: {
        some: {
          makes: {
            make_short_name: makes,
          },
        },
      },
    },
    select: {
      model_short_name: true,
    },
  });

  return NextResponse.json(model);
}
