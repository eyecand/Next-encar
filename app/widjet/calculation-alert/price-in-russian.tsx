import { PriceView } from "./lib/price-view";

export const PriceInRussian = ({
  customs,
  poshlina,
  utilSbor,
  customsOformlenie,
}: {
  customs: number;
  poshlina: number;
  utilSbor: number;
  customsOformlenie: number;
}) => {
  return (
    <div className="lg:basis-1/2">
      <div className="my-6 pt-6 border-t border-zinc-100">
        <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
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
      <div className="my-6 pt-6 border-t border-zinc-100">
        <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
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
      <div className="my-6 pt-6 border-t border-zinc-100">
        <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
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
      <div className="my-6 pt-6 border-t border-zinc-100">
        <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
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
    </div>
  );
};
