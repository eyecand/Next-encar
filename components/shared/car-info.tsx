import {
  BlockItem,
  StatisticAlertDialog,
  StatisticCar,
} from "@/components/shared";
type InfoProps = {
  // model: string | null | undefined;
  // make: string | null | undefined;
  // years: number | undefined;
  price: number | null | undefined;
  fuel: string | null | undefined;
  transmission: string | null | undefined;
  mileage: number | undefined;
  body: string | null | undefined;
  grades: string | null | undefined;
  engine: number | undefined;
  // lot: string | null;
};

export const CarInfo = ({
  price,
  fuel,
  transmission,
  mileage,
  body,
  grades,
  engine,
}: InfoProps) => {
  const priceRUB = price ? price * 10000 : "Уточняйте у оператора";
  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-center font-bold text-base md:text-3xl mb-5 text-black ">
        {priceRUB}
      </h2>

      <div className="border-solid border-t border-gray-200 mt-2 pt-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Тип кузова" value={body} />
          <BlockItem title="Трансмиссия" value={transmission} />
          <BlockItem title="Комплектация" value={grades} />
        </div>
        <div className="space-y-4 w-full lg:w-1/2">
          <BlockItem title="Пробег, км" value={mileage} />
          <BlockItem title="Двигатель" value={engine} />
          <BlockItem title="Топливо" value={fuel} />
        </div>
      </div>
      <StatisticCar />
      <StatisticAlertDialog />
      {/* <PriceInfo priceEn={data.average_cost_japan} priceRub={data.full_duty} /> */}
    </div>
  );
};
