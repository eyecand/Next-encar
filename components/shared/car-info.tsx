import {
  AlertDiagnostic,
  BlockItem,
  StatisticAlertDialog,
  StatisticCar,
} from "@/components/shared";
import { detectFuels } from "@/hooks/use-fuels";
type AccidentProps = {
  current_accident_count: number;
  other_accident_count: number;
  robber_count: number;
  flood_total_loss_count: number;
  flood_part_loss_count: number;
  government: boolean;
  business: boolean;
  loan: boolean;
};
export type AccidentDetailsProps = {
  date: Date;
  type: string;
  insurance_benefit: number;
  part_cost: number;
  labor_cost: number;
  painting_cost: number;
};
type InfoProps = {
  model: string | null | undefined;
  make: string | null | undefined;
  years: number | undefined;
  price: number | null | undefined;
  fuel: string | null | undefined;
  transmission: string | null | undefined;
  mileage: number | undefined;
  // body: string | null | undefined;
  grades: string | null | undefined;
  engine: number | undefined;
  // lot: string | null;
  accident: AccidentProps | null;
  accident_details: AccidentDetailsProps[];
  changeCount: number;
  plate_number: string | null;
};

export const CarInfo = ({
  make,
  model,
  years,
  price,
  fuel,
  transmission,
  mileage,
  grades,
  engine,
  accident,
  accident_details,
  changeCount,
  plate_number,
}: InfoProps) => {
  const engine_displacement = engine
    ? (Math.round(engine) / 1000).toFixed(1)
    : "";
  const priceWon = price ? price * 10000 : 0;
  const paAccident = accident?.other_accident_count ?? 0;
  const prAccident = accident?.current_accident_count ?? 0;
  const totalA = paAccident + prAccident;

  return (
    <div className="w-full md:w-1/2">
      <div>
        <h2 className="font-gilroy font-bold text-2xl lg:text-3xl mb-4 text-zinc-800">
          {make} {model} {years}, {engine_displacement} л. из Кореи
        </h2>
        <div className="flex items-center">
          {grades}{" "}
          {totalA ? (
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
          <BlockItem title="Год" value={years} />
          <BlockItem title="Пробег, км" value={mileage} />
          <BlockItem title="Трансмиссия" value={transmission} />
        </div>
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Двигатель" value={engine} />
          <BlockItem title="Топливо" value={detectFuels(fuel || "")} />
        </div>
      </div>
      <StatisticCar
        flood={accident?.flood_total_loss_count}
        robber={accident?.robber_count}
        pastAccident={accident?.other_accident_count}
        presentAccident={accident?.current_accident_count}
        countChanges={changeCount}
      />
      <div className="flex flex-col xl:flex-row gap-4">
        <StatisticAlertDialog
          make={make}
          model={model}
          grades={grades}
          engine={engine}
          fuel={fuel}
          plate_number={plate_number}
          buisness={accident?.business}
          goverment={accident?.government}
          loan={accident?.loan}
          robber={accident?.robber_count}
          accident_details={accident_details}
          years={years}
        />
        <AlertDiagnostic />
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
                  .format(priceWon)
                  .replace(",", ".")}{" "}
                ₩
              </span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Стоимость в России</span>
              <span className="text-lg font-semibold text-zinc-700">
                {priceWon} ₽
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
