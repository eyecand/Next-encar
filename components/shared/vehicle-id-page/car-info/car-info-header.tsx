export const CarInfoHeader = ({
  make,
  model,
  engine,
  fuel,
  year,
}: CarInfoHeaderProps) => {
  return (
    <h2 className="font-gilroy font-bold flex text-[30px] mb-2 text-zinc-800">
      {make} {model === "Canival" ? "Carnival" : model} {year}
      {fuel === "Electricity"
        ? " "
        : `, ${(Math.round(engine) / 1000).toFixed(1)} л. `}
      из Кореи
    </h2>
  );
};
type CarInfoHeaderProps = {
  make: string;
  model: string;
  engine: number;
  fuel: string;
  year: number;
};
