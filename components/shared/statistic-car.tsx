type StaticPtops = {
  flood: number | undefined;
  robber: number | undefined;
  pastAccident: number | undefined;
  presentAccident: number | undefined;
  countChanges: number;
};
export const StatisticCar = ({
  flood,
  robber,
  pastAccident,
  presentAccident,
  countChanges,
}: StaticPtops) => {
  const past = pastAccident ?? 0;
  const present = presentAccident ?? 0;
  const totalAccident = past + present;
  return (
    <div className="bg-gray-200/70 dark:bg-dark-gray py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-4 text-zinc-800 dark:text-zinc-100 my-6">
      <div className="space-y-4 w-full lg:w-1/2">
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Владелец
          </span>
          <span className="font-semibold text-xl md:text-lg">
            {countChanges}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Аварий
          </span>
          <span className="font-semibold text-xl md:text-lg">
            {totalAccident}
          </span>
        </div>
      </div>
      <div className="space-y-4 w-full lg:w-1/2">
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Был в угоне
          </span>
          <span className="font-semibold text-xl md:text-lg">
            {robber ? "Да" : "Нет"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Утопленник
          </span>
          <span className="font-semibold text-xl md:text-lg">
            {flood ? "Да" : "Нет"}
          </span>
        </div>
      </div>
    </div>
  );
};
