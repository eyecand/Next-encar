"use client";
import {
  AlertDiagnostic,
  BlockItem,
  StatisticAlertDialog,
  StatisticCar,
} from "@/components/shared";

import { detectFuels } from "@/hooks/use-fuels";
import { FromKRWtoRUB } from "@/lib/price-from-krw-to-rub";
import { useCBRStore } from "@/store/cbr";
import { useEURStore } from "@/store/eur";
import { Button } from "../ui/button";
import { VehicleIdProps } from "@/app/vehicle/[id]/model";

export const CarInfo = ({
  details,
  _count,
  accident,
  accident_details,
  diagnostics,
  vehicle_plate_number,
}: VehicleIdProps) => {
  const totalAccident =
    Number(accident?.other_accident_count) +
    Number(accident?.current_accident_count);
  const cbr = useCBRStore((state) => state.cbr);
  const EUR = useEURStore((state) => state.eur);
  const realFuel = details?.fuel.fuel_english
    ? details?.fuel.fuel_english
    : "Gasoline";
  return (
    <div className="w-full md:w-1/2">
      <div>
        <h2 className="font-gilroy font-bold text-2xl lg:text-3xl mb-4 text-zinc-800">
          {details?.makes.make_short_name} {details?.model.model_short_name}{" "}
          {details?.form_year},{" "}
          {(Math.round(Number(details?.engine_displacement)) / 1000).toFixed(1)}{" "}
          л. из Кореи
        </h2>
        <div className="flex items-center">
          {details?.grades.grade_english}{" "}
          {totalAccident ? (
            <span className="bg-rose-50 border-rose-100  text-rose-600 ml-4 px-3 py-1 rounded-full">
              был в аварии
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="border-solid border-t border-gray-200 mt-2 pt-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Год" value={details?.form_year} />
          <BlockItem title="Пробег, км" value={details?.mileage} />
          <BlockItem
            title="Трансмиссия"
            value={details?.transmission.transmission_english}
          />
        </div>
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Двигатель" value={details?.engine_displacement} />
          <BlockItem
            title="Топливо"
            value={detectFuels(String(details?.fuel.fuel_english))}
          />
        </div>
      </div>
      <StatisticCar
        flood={accident?.flood_total_loss_count}
        robber={accident?.robber_count}
        pastAccident={accident?.other_accident_count}
        presentAccident={accident?.current_accident_count}
        countChanges={_count.car_info}
      />

      <div className="flex flex-col lg:flex-row gap-4">
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
          <AlertDiagnostic diagnostics={diagnostics} />
        )}
      </div>

      {/* Total Price */}
      <div className="border-t border-zinc-200 mt-6 pt-6">
        <div className="table price w-full">
          <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
            <span>Типо ввоза</span>
            <span>Итоговая стоимость</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-zinc-500">
              <span>Стоимость в Корее</span>
              <span className="text-lg font-semibold text-zinc-700">
                {new Intl.NumberFormat("ru-RU")
                  .format(Number(details?.origin_price) * 10000)
                  .replace(",", ".")}{" "}
                ₩
              </span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Стоимость в России</span>
              <span className="text-lg font-semibold text-zinc-700">
                ~{" "}
                {new Intl.NumberFormat("ru-RU")
                  .format(
                    FromKRWtoRUB(
                      Number(details?.origin_price) * 10000,
                      cbr,
                      EUR,
                      Number(details?.engine_displacement),
                      realFuel,
                      Number(details?.form_year)
                    )
                  )
                  .replace(",", ".")}{" "}
                ₽
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-zinc-600 mt-8 mb-4">
          Стоимость является ориентировочной, включая все расходы в г.
          Владивосток. Расчёт может быть некорректным. <br /> Обратитесь к нам,
          оставив заявку, чтобы получить консультацию.
        </p>
        <button className="w-full p-4 bg-blue-600 text-white uppercase font-gilroy font-semibold rounded-xl shadow-lg hover:shadow-none shadow-blue-600/40 hover:translate-y-2 transition-all transform-gpu flex items-center justify-center relative">
          оставить заявку
        </button>
      </div>
      {/* <PriceInfo priceEn={data.average_cost_japan} priceRub={data.full_duty} /> */}
    </div>
  );
};
