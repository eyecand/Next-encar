import { CustomsDuty } from "@/app/widjet/calculation-alert/lib/customs-duty";
import { CalculationCar } from "@/lib/calcilation-car";
import { CalculationUtilSbor } from "@/lib/calculation-util-sbor";
import { DetectedCustomsClearance } from "@/lib/detected-customs-clearance";
import { DetectedFullYear } from "@/lib/detected-full-year";
import { DetectedKPower } from "@/lib/detected-K-power";
import { prisma } from "@/prisma/prisma-client";
import axios from "axios";
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
  const EUR = cbr.find((item) => item.char_code === "EUR")?.value;
  const KRW = cbr.find((item) => item.char_code === "KRW")?.value;
  const fraht = cbr.find((item) => item.char_code === "fraht")?.value;
  const broker = cbr.find((item) => item.char_code === "broker")?.value;
  const k_krw = cbr.find((item) => item.char_code === "K_KRW")?.value;

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
    Number(car?.advertisements?.price) * Number(KRW) * 10
  );
  const poshlina = CustomsDuty(
    Number(car?.advertisements?.price) * 10000,
    Number(KRW),
    Number(EUR),
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
  console.log("russia", poshlina + Number(broker) + util + oformlenie);
  console.log(
    "korea",
    Number(car?.advertisements?.price) * 10000 + Number(fraht)
  );
  const total =
    Math.floor(
      (Number(car?.advertisements?.price) * 10000 + Number(fraht)) *
        Number(KRW) *
        0.001 *
        Number(k_krw)
    ) +
    poshlina +
    Number(broker) +
    util +
    oformlenie;
  return NextResponse.json(total);
}
