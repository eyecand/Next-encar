"use client";
import {
  AlertDiagnostic,
  BlockItem,
  StatisticAlertDialog,
} from "@/components/shared";
import { detectFuels } from "@/lib/detect-fuels";
import { Button } from "../ui/button";
import { VehicleIdProps } from "@/app/[makes]/[model]/[evolutions]/[id]/model";
import { detectTransmission } from "./form-korea-cars/second-line/lib";
import { detectMake } from "./form-korea-cars/first-line/lib";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import Link from "next/link";
import { CarInfoHeader } from "./vehicle-id-page/car-info/car-info-header";
import { CarInfoWarnings } from "./vehicle-id-page/car-info/car-info-warnings";
import { detectedMontYear } from "@/lib/month-year";
import ShareButton from "./ShareButton";
import { CoastCar } from "./car-info/coast-car/coast-car";

export const CarInfo = ({
  details,
  accident,
  accident_details,
  diagnostics,
  vehicle_plate_number,
  advertisements,
  inspections,
  id,
  auctionId,
  sell_type,
  isActive,
}: VehicleIdProps) => {
  const isNoProhodCar = NoProhodCar(String(details?.release_date));

  const copyLink = `https://autofish.ru/${encodeURI(
    String(details?.makes.make_short_name)
  )}/${encodeURI(String(details?.model.model_short_name))}/${encodeURI(
    String(details?.model.model_english)
  )}/uid-${id}`;
  const encodedCopyLink = encodeURIComponent(copyLink); // Используем encodeURIComponent

  const strHref = `${detectMake(String(details?.makes.make_short_name))}, ${
    details?.model.model_english === "Canival"
      ? "Carnival"
      : details?.model.model_english
  }, ${new Date(String(details?.release_date)).getFullYear()} г., ${
    details?.engine_displacement
  } см3, ${encodedCopyLink}. Хочу получить консультацию.`;
  const totalAccident =
    Number(accident?.other_accident_count) +
    Number(accident?.current_accident_count);
  const realFuel = details?.fuel.fuel_english
    ? details?.fuel.fuel_english
    : "Gasoline";
  return (
    <div className="w-full md:w-1/2">
      {/* Header */}
      <section className="flex">
        <div className="w-full">
          <div className="flex gap-2">
            <CarInfoHeader
              make={detectMake(String(details?.makes.make_short_name))}
              model={String(details?.model.model_english)}
              engine={Number(details?.engine_displacement)}
              fuel={realFuel}
              year={new Date(String(details?.release_date)).getFullYear()}
            />
            <ShareButton
              text={encodeURIComponent(copyLink)}
              copyLink={copyLink}
            />
          </div>
          {/* Был в аварии, Кредит */}
          <div className="flex  justify-between">
            <CarInfoWarnings
              grade={
                details?.grades.grade_english
                  ? details?.grades.grade_english
                  : ""
              }
              grade_detail={
                details?.grades.grade_detail_english
                  ? details?.grades.grade_detail_english
                  : ""
              }
              totalAccident={totalAccident}
              sell_type={sell_type}
            />
            <Link
              className=" flex justify-center items-center"
              target="_blank"
              rel="nofollow"
              href=" https://t.me/autofish_main_bot"
            >
              <Button className="text-blue-500" variant={"link"}>
                Уведомить о новых авто
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Стоимость */}
      <CoastCar
        krw_price={Number(advertisements?.price) * 10000}
        isNoProhodCar={isNoProhodCar}
        realFuel={realFuel}
        engine={Number(details?.engine_displacement)}
        makes={String(details?.makes.make_short_name)}
        model={String(details?.model.model_english)}
        strHref={strHref}
        year={String(details?.release_date)}
        isActive={isActive}
      />

      {/* Характеристики авто */}
      <section className="border-solid border-t border-gray-200 mt-2 pt-4 flex flex-col  lg:items-start  gap-4">
        <h3 className="text-lg md:text-xl font-semibold">Характеристики</h3>
        <div className="w-full flex flex-col md:flex-row ">
          <div className="space-y-4 w-full lg:w-1/2 mr-12">
            <BlockItem
              title="Дата выпуска"
              value={detectedMontYear(String(details?.release_date))}
            />
            <BlockItem
              title="Пробег, км"
              value={new Intl.NumberFormat("ru-RU")
                .format(Number(details?.mileage))
                .replace(",", ".")}
            />
            <BlockItem
              title="Трансмиссия"
              value={detectTransmission(
                String(details?.transmission.transmission_english)
              )}
            />
          </div>
          <div className="space-y-4 w-full mt-4 md:mt-0 lg:w-1/2">
            <BlockItem title="Двигатель" value={details?.engine_displacement} />
            <BlockItem
              title="Топливо"
              value={detectFuels(String(details?.fuel.fuel_english))}
            />
            <BlockItem
              title="Привод"
              value={
                details?.drive?.drive_type ? details?.drive?.drive_type : "2WD"
              }
            />
          </div>
        </div>
      </section>
      {/* Alert "Отчет страховой" && компании "Отчет осмотра авто"*/}
      <section className="flex flex-col gap-4 mt-7">
        <StatisticAlertDialog
          plate_number={vehicle_plate_number}
          accident_details={accident_details}
          details={details}
          accident={accident}
        />
        {diagnostics?.diagnosis === null ||
        diagnostics?.diagnosis === undefined ? (
          <div className="group relative w-full grow">
            <Button
              disabled={true}
              className=" px-6 py-6 w-full   bg-blue-400 hover:bg-blue-600 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative grow"
            >
              Отчет осмотра авто
            </Button>
            <span className="pointer-events-none absolute -top-10 -left-12 w-max bg-gray-50 rounded-lg px-4 py-1 opacity-0 transition-opacity group-hover:opacity-100">
              У данной машины отсутствует диагностика
            </span>
          </div>
        ) : (
          <AlertDiagnostic
            diagnostics={diagnostics}
            inspections={inspections?.inspection_details}
          />
        )}
      </section>
      {/* Ссылка на оригинальное обьявление */}
      <section className=" mt-6 ">
        <div className="group relative w-full grow mt-4 flex justify-center">
          <a
            target="_blank"
            href={`https://fem.encar.com/cars/detail/${String(auctionId)}`}
          >
            <Button className="text-blue-500" variant={"link"}>
              Объявление на ENCAR
            </Button>
          </a>
        </div>
        <p className="text-sm text-zinc-600 mt-2 ">
          Стоимость является ориентировочной, включая все расходы в г.
          Владивосток. <br /> Обратитесь к нам, оставив заявку, чтобы получить
          консультацию.
        </p>
      </section>
    </div>
  );
};
