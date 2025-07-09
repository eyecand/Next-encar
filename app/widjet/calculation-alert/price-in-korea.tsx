import { PriceView } from "./lib/price-view";
import { PriceViewCalclation } from "./lib/price-view-calculation";
import { TooltipUI } from "./lib/tooltip-ui";

export const PriceInKorea = ({
  priceEn,
  KRW,
  fraht,
  k_krw,
}: {
  priceEn: number;
  KRW: number;
  fraht: number;
  k_krw: number;
}) => {
  return (
    <div className="lg:basis-1/2">
      <div>
        <div className="my-6 pl-7 pt-6 border-t border-zinc-100">
          <p className="text-base flex items-start justify-between gap-4 text-zinc-700">
            Цена авто{" "}
            <span className="whitespace-nowrap font-semibold text-zinc-600">
              <PriceView
                tilda={false}
                price={String(priceEn)}
                label="₩"
                className="text-zinc-400 font-normal text-sm mr-2"
              />
              <PriceViewCalclation
                price={priceEn}
                valute={KRW}
                label="₽"
                className=""
                k={k_krw}
              />
            </span>
          </p>
        </div>
        <div className="my-6 pt-6 border-t border-zinc-100">
          <div className="text-base flex items-start justify-between gap-4 text-zinc-700 group">
            <div className="flex items-center justify-start gap-2">
              <TooltipUI
                title={
                  "Логистика, снятие с учёта, услуги дилера.Расходы усредненные для предварительных расчетов и могут изменяться"
                }
              />{" "}
              Расходы по Корее
            </div>
            <span className="whitespace-nowrap font-semibold text-zinc-600">
              <PriceView
                tilda={false}
                price={String(fraht)}
                label="₩"
                className="text-zinc-400 font-normal text-sm mr-2"
              />
              <PriceViewCalclation
                price={fraht}
                valute={KRW}
                label="₽"
                className=""
                k={k_krw}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
