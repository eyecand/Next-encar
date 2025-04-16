import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const fuels = await prisma.lib_fuels.findMany({
    select: {
      fuel_english: true,
    },
  });

  return NextResponse.json(fuels);
}
