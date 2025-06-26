import { CustomsDuty } from "@/app/widjet/calculation-alert/lib/customs-duty";
import { CalculationUtilSbor } from "@/lib/calculation-util-sbor";
import { DetectedFullYear } from "@/lib/detected-full-year";
import { DetectedKPower } from "@/lib/detected-K-power";
import { prisma } from "@/prisma/prisma-client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || null;
  const power = request.nextUrl.searchParams.get("power") || "1";
  const response = await axios.get<CBRPRops>(
    "https://www.cbr-xml-daily.ru/daily_json.js"
  );

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
  const differentYear = DetectedFullYear(String(car?.details?.release_date));
  const util = CalculationUtilSbor(
    Number(differentYear),
    Number(car?.details?.engine_displacement)
  );
  //   const isProhodCarMainPage = NoProhodCar(
  //     String(car?.details?.release_date)
  //   );
  const K_Power = DetectedKPower(Number(power));
  const customsCoast = CustomsDuty(
    Number(car?.advertisements?.price) * 10000,
    Number((Number(response.data.Valute.KRW.Value) * 1.08).toFixed(2)),
    response.data.Valute.EUR.Value,
    Number(car?.details?.engine_displacement),
    String(car?.details?.fuel.fuel_english),
    differentYear,
    Number(power),
    K_Power
  );
  const customs = 100000; //таможня

  const fraht = 2100000;
  const totalKorea = Math.floor(
    Number(car?.advertisements?.price) * 10000 + fraht
  );
  const totalRussia = customsCoast + customs + util;
  const total =
    Math.floor(
      totalKorea *
        Number((Number(response.data.Valute.KRW.Value) * 1.08).toFixed(2)) *
        0.001
    ) + totalRussia;
  return NextResponse.json(total);
}
interface CBRPRops {
  Date: string; // Или Date, если будете парсить строку в Date объект
  PreviousDate: string; // Или Date
  PreviousURL: string;
  Timestamp: string; // Или Date
  Valute: {
    [key: string]: ValuteData; // Индексный тип для динамических ключей валют (AUD, AZN, ...)
  };
}
interface ValuteData {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
