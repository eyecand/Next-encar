import {
  AlertDiagnostic,
  BlockItem,
  StatisticAlertDialog,
  StatisticCar,
} from "@/components/shared";
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
}: InfoProps) => {
  const engine_displacement = engine
    ? (Math.round(engine) / 1000).toFixed(1)
    : "";
  const priceWon = price ? price * 1000 : 0;
  return (
    <div className="w-full md:w-1/2">
      <div>
        <h2 className="font-gilroy font-bold text-2xl lg:text-3xl mb-4 text-zinc-800">
          {make} {model} {years}, {engine_displacement} л. из Кореи
        </h2>
        <div className="flex items-center">
          {grades}{" "}
          <span className="bg-rose-50 border-rose-100  text-rose-600 ml-4 px-3 py-1 rounded-full">
            был в аварии
          </span>
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
          <BlockItem title="Топливо" value={fuel} />
        </div>
      </div>
      <StatisticCar />
      <div className="flex flex-col xl:flex-row gap-4">
        <StatisticAlertDialog />
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
                {priceWon} ₩
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
