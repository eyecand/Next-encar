import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const cbr = await prisma.currency_rates.findMany({
    select: {
      char_code: true,
      name: true,
      value: true,
    },
  });
  return NextResponse.json(cbr);
}
