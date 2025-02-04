import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const makes = await prisma.lib_makes.findMany({
    select: {
      make_english: true,
    },
  });

  return NextResponse.json(makes);
}
