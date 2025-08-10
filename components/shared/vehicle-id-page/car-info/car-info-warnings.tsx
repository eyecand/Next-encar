export const CarInfoWarnings = ({
  grade,
  grade_detail,
  totalAccident,
  sell_type,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {grade.replace(" China Manufacturer", "")}{" "}
      {grade_detail ? grade_detail.replace(" China Manufacturer", "") : ""}{" "}
      {totalAccident ? (
        <span className="bg-rose-50 border-rose-100 text-[13px] text-rose-600 ml-1 lg:ml-4 px-3 py-1 rounded-full">
          был в аварии
        </span>
      ) : (
        ""
      )}
      {(sell_type === "RENT_SUCCESSION" || sell_type === "RENT_CAR") && (
        <div className="button flex ml-0 lg:ml-2">
          <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
            Рента
          </div>
        </div>
      )}
      {(sell_type === "FINANCING_LEASE" || sell_type === "OPERATING_LEASE") && (
        <div className="button flex ml-0 lg:ml-2">
          <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
            Кредит
          </div>
        </div>
      )}
    </div>
  );
};
type Props = {
  grade: string;
  grade_detail: string;
  totalAccident: number;
  sell_type: string;
};
