import { PriceView } from "./lib/price-view";

export const PriceInRussian = ({
  customs,
  poshlina,
  utilSbor,
  customsOformlenie,
  totalRussia,
  commision,
}: {
  customs: number;
  poshlina: number;
  utilSbor: number;
  customsOformlenie: number;
  totalRussia: number;
  commision: number;
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 font-semibold text-sm  md:text-lg">
        <img
          src="/flag-russian.webp"
          alt="flag-russian"
          width={40}
          height={40}
        />{" "}
        <span>Расходы в России</span>
      </div>
      <div className="my-6 ">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
          <div className="flex items-center justify-start gap-2">
            <span className="whitespace-nowrap  text-zinc-600">
              Услуги брокера
            </span>
          </div>
          <PriceView
            tilda={false}
            className="whitespace-nowrap font-semibold text-zinc-600"
            label="₽"
            price={String(customs)}
          />
        </div>
      </div>
      <div className="my-6 ">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
          <div className="flex items-center justify-start gap-2">
            <span className="whitespace-nowrap  text-zinc-600">
              Таможенное оформление
            </span>
          </div>
          <PriceView
            tilda={false}
            className="whitespace-nowrap font-semibold text-zinc-600"
            label="₽"
            price={String(customsOformlenie)}
          />
        </div>
      </div>
      <div className="my-6 ">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
          <div className="flex items-center justify-start gap-2">
            {" "}
            Пошлина
            <span className="ml-2 text-sm text-zinc-500">(на физ. лицо)</span>
          </div>

          <PriceView
            tilda={true}
            price={String(poshlina)}
            label="₽"
            className="whitespace-nowrap font-semibold"
          />
        </div>
      </div>
      <div className="my-6 ">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
          <div className="flex items-center justify-start gap-2">
            {" "}
            Утил. сбор
          </div>

          <PriceView
            tilda={true}
            price={String(utilSbor)}
            label="₽"
            className="whitespace-nowrap font-semibold"
          />
        </div>
      </div>
      <div className="my-6 ">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
          <div className="flex items-center justify-start gap-2"> Комиссия</div>

          <PriceView
            tilda={false}
            price={String(commision)}
            label="₽"
            className="whitespace-nowrap font-semibold"
          />
        </div>
      </div>
      <div className="mt-6 mb-3 pt-6 border-t-2 border-zinc-200">
        <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group font-bold">
          <div className="flex items-center justify-start gap-2">
            Итого в России
          </div>

          <PriceView
            tilda={true}
            price={String(totalRussia)}
            label="₽"
            className="whitespace-nowrap "
          />
        </div>
      </div>
    </div>
  );
};
