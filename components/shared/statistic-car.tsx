export const StatisticCar = () => {
  return (
    <div className="bg-gray-200/70 dark:bg-dark-gray py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-4 text-zinc-800 dark:text-zinc-100 my-6">
      <div className="space-y-4 w-full lg:w-1/2">
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Владелец
          </span>
          <span className="font-semibold text-xl md:text-lg">2</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Аварий
          </span>
          <span className="font-semibold text-xl md:text-lg">1</span>
        </div>
      </div>
      <div className="space-y-4 w-full lg:w-1/2">
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Был в угоне
          </span>
          <span className="font-semibold text-xl md:text-lg">Нет</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-zinc-500 dark:text-zinc-400 w-1/2">
            Утопленник
          </span>
          <span className="font-semibold text-xl md:text-lg">Нет</span>
        </div>
      </div>
    </div>
  );
};
