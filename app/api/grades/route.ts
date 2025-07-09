import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const makes = request.nextUrl.searchParams.get("makes") || "";
  const model = request.nextUrl.searchParams.get("model") || "";

  const gradesGrouped = await prisma.vehicle_details.groupBy({
    by: ["grade_id"],
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

  // Get the actual grade details
  const gradeIds = gradesGrouped.map((g) => g.grade_id);
  const grades = await prisma.lib_grades.findMany({
    where: {
      id: {
        in: gradeIds,
      },
    },
    select: {
      grade_english: true,
      grade_detail_english: true,
    },
  });

  return NextResponse.json(grades);
}
