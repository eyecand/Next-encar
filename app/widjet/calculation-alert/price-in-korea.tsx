import { PriceView } from "./lib/price-view";
import { PriceViewCalclation } from "./lib/price-view-calculation";
import { TooltipUI } from "./lib/tooltip-ui";

export const PriceInKorea = ({
  priceEn,
  KRW,
  fraht,
  k_krw,
  totalKorea,
}: {
  priceEn: number;
  KRW: number;
  fraht: number;
  k_krw: number;
  totalKorea: number;
}) => {
  return (
    <div className="">
      <div>
        <div className="">
          <p className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700">
            Цена авто{" "}
            <span className="whitespace-nowrap  font-semibold text-zinc-600">
              <PriceView
                tilda={false}
                price={String(priceEn)}
                label="₩"
                className="text-zinc-400 font-normal text-xs md:text-sm mr-2"
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
        <div className="my-6">
          <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group">
            <div className="flex items-center justify-start gap-2">
              Расходы по Корее{" "}
              <TooltipUI
                title={
                  "Логистика, снятие с учёта, услуги дилера.Расходы усредненные для предварительных расчетов и могут изменяться"
                }
              />
            </div>
            <span className="whitespace-nowrap font-semibold text-zinc-600">
              <PriceView
                tilda={false}
                price={String(fraht)}
                label="₩"
                className="text-zinc-400 font-normal text-xs md:text-sm mr-2"
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
        <div className="my-6  border-t-2 border-zinc-200">
          <div className="text-sm md:text-base flex items-start justify-between gap-4 text-zinc-700 group mt-4">
            <div className="flex items-center justify-start gap-2 font-bold">
              Итого в Корее
            </div>
            <span className="whitespace-nowrap font-bold text-zinc-600">
              <PriceView
                tilda={true}
                className="text-zinc-400 text-xs md:text-sm mr-2"
                price={String(totalKorea)}
                label="₩"
              />
              <PriceViewCalclation
                className="text-sm md:text-lg"
                label="₽"
                valute={KRW}
                price={totalKorea}
                k={k_krw}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
