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
import { CalculationAlert } from "@/app/widjet/calculation-alert/calculation-alert";
import { NoProhodCar } from "@/lib/is-no-prohod-car";
import { PriceView } from "@/app/widjet/calculation-alert/lib/price-view";
import { CalculationCar } from "@/lib/calcilation-car";
import Link from "next/link";
import { CarInfoHeader } from "./vehicle-id-page/car-info/car-info-header";
import { CarInfoWarnings } from "./vehicle-id-page/car-info/car-info-warnings";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { detectedMontYear } from "@/lib/month-year";
import ShareButton from "./ShareButton";
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
  EUR,
  KRW,
  fraht,
  broker,
  k_krw,
  photoForSocial,
}: VehicleIdProps) => {
  const isNoProhodCar = NoProhodCar(String(details?.release_date));

  const copyLink = `https://autofish.ru/${encodeURI(
    String(details?.makes.make_short_name)
  )}/${encodeURI(String(details?.model.model_short_name))}/${encodeURI(
    String(details?.model.model_english)
  )}/uid-${id}`;
  const encodedCopyLink = encodeURIComponent(copyLink); // Используем encodeURIComponent
  //https://wa.me/79265850382
  const linkWa = `https://api.whatsapp.com/send/?phone=79265850382&text=Здравствуйте, заинтересовал автомобиль ${detectMake(
    String(details?.makes.make_short_name)
  )}, ${
    details?.model.model_english === "Canival"
      ? "Carnival"
      : details?.model.model_english
  }, ${new Date(String(details?.release_date)).getFullYear()} г., ${
    details?.engine_displacement
  } см3, ${encodedCopyLink}. Хочу получить консультацию.`;
  //https://t.me/Avademus
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
      <div className="flex">
        {/* Header */}
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

          <div className="flex  justify-between">
            {/* Был в аварии, Кредит */}
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
      </div>

      <div className="flex flex-col md:flex-row justify-between border-solid border-t border-gray-200 mt-2">
        {/* Стоимость */}

        <div className="flex flex-col gap-4 w-full md:w-[60%] mt-4">
          <div className="flex justify-between items-center text-zinc-500">
            <span>Стоимость в Корее</span>
            <span className="text-lg font-semibold text-zinc-700">
              {new Intl.NumberFormat("ru-RU")
                .format(Number(advertisements?.price) * 10000)
                .replace(",", ".")}{" "}
              ₩
            </span>
          </div>
          <div
            className="flex justify-between items-center 
            text-zinc-500"
          >
            <span>Стоимость в России</span>
            <span className="text-xl font-semibold text-zinc-700">
              {isNoProhodCar ? (
                <PriceView
                  tilda={true}
                  className=""
                  label="₽"
                  price={String(
                    CalculationCar(
                      Number(advertisements?.price) * 10000,
                      KRW,
                      EUR,
                      Number(details?.engine_displacement),
                      realFuel,
                      "4",
                      broker,
                      fraht,
                      k_krw,
                      0
                    )
                  )}
                />
              ) : (
                <PriceView
                  tilda={true}
                  className=""
                  label="₽"
                  price={String(
                    CalculationCar(
                      Number(advertisements?.price) * 10000,
                      KRW,
                      EUR,
                      Number(details?.engine_displacement),
                      realFuel,
                      String(details?.release_date),
                      broker,
                      fraht,
                      k_krw,
                      0
                    )
                  )}
                />
              )}
            </span>
          </div>
          {/* Подробный расчет */}
          <CalculationAlert
            engine={Number(details?.engine_displacement)}
            fuel={realFuel}
            priceEn={Number(advertisements?.price) * 10000}
            year={String(details?.release_date)}
            EUR={EUR}
            KRW={KRW}
            broker={broker}
            fraht={fraht}
            k_krw={k_krw}
            copyLink={copyLink}
            make={detectMake(String(details?.makes.make_short_name))}
            model={
              details?.model.model_english === "Canival"
                ? "Carnival"
                : String(details?.model.model_english)
            }
          />
        </div>
        <div className="flex flex-col w-full md:w-[36%] mt-2 md:mt-4">
          <a
            href={strHref}
            className="w-full  py-4 text-sm bg-[#e05358] text-white uppercase font-gilroy font-semibold rounded-xl  flex items-center justify-center hover:bg-[#ac3f42] duration-300"
          >
            Заказать
          </a>
          <span className="w-full text-center mt-2">или напишите нам</span>
          <div className="flex items-center justify-between gap-4 mt-2 ">
            <Link
              className="block w-[50%]"
              target="_blank"
              rel="nofollow"
              href={`https://t.me/Autofish_office?text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            >
              <button className="flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                <FaTelegram size={25} className="text-blue-500" />
              </button>
            </Link>
            <Link
              className="block w-[50%]"
              target="_blank"
              rel="nofollow"
              href={`https://api.whatsapp.com/send/?phone=79850364206&text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            >
              <button className="flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                <FaWhatsapp size={25} className="text-green-500" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Основные характеристики авто */}
      <div className="border-solid border-t border-gray-200 mt-2 pt-4 flex flex-col  lg:items-start  gap-4">
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
      </div>

      <div className="flex flex-col gap-4 mt-7">
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
      </div>

      <div className=" mt-6 ">
        {/* Ссылка на оригинальное обьявление */}
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
      </div>
      {/* <PriceInfo priceEn={data.average_cost_japan} priceRub={data.full_duty} /> */}
    </div>
  );
};
