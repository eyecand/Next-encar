import { CustomsDuty } from "@/app/widjet/calculation-alert/lib/customs-duty";
import { CalculationUtilSbor } from "@/lib/calculation-util-sbor";
import { DetectedCustomsClearance } from "@/lib/detected-customs-clearance";
import { DetectedFullYear } from "@/lib/detected-full-year";
import { DetectedKPower } from "@/lib/detected-K-power";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || null;
  const power = request.nextUrl.searchParams.get("power") || "1";

  const cbr = await prisma.currency_rates.findMany({
    select: {
      char_code: true,
      name: true,
      value: true,
    },
  });
  const cbrMap = new Map(cbr.map((item) => [item.char_code, item.value]));

  const car = await prisma.encar_vehicles.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      advertisements: {
        select: { price: true },
      },
      details: {
        select: {
          fuel: { select: { fuel_english: true } },
          engine_displacement: true,
          release_date: true,
        },
      },
    },
  });
  const K_Power = DetectedKPower(Number(power));
  const oformlenie = DetectedCustomsClearance(
    Number(car?.advertisements?.price) * Number(cbrMap.get("KRW")) * 10
  );
  const poshlina = CustomsDuty(
    Number(car?.advertisements?.price) * 10000,
    Number(cbrMap.get("KRW")),
    Number(cbrMap.get("EUR")),
    Number(car?.details?.engine_displacement),
    String(car?.details?.fuel.fuel_english),
    DetectedFullYear(String(car?.details?.release_date)),
    Number(power),
    K_Power
  );
  const util = CalculationUtilSbor(
    DetectedFullYear(String(car?.details?.release_date)),
    Number(car?.details?.engine_displacement)
  );
  const total =
    Math.floor(
      (Number(car?.advertisements?.price) * 10000 +
        Number(cbrMap.get("fraht"))) *
        Number(cbrMap.get("KRW")) *
        0.001 *
        Number(Number(cbrMap.get("K_KRW")))
    ) +
    poshlina +
    Number(cbrMap.get("broker")) +
    util +
    oformlenie;
  return NextResponse.json(total);
}
