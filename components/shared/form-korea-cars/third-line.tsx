"use client";

import { Input } from "@/components/ui/input";

export const TherdLine: React.FC<Props<string | null>> = ({
  onChangeEngineMin,
  onChangeEngineMax,
  onChangePriceMin,
  onChangePriceMax,
  onChengeMileageMin,
  onChengeMileageMax,
  priceMin,
  priceMax,
  engineMin,
  engineMax,
  mileageMin,
  mileageMax,
}) => {
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <Input
              placeholder="Пробег от"
              type="number"
              min={0}
              value={mileageMin ? Number(mileageMin) : ""}
              onChange={(e) => onChengeMileageMin(e.target.value)}
            />
          </div>
          <div className=" w-full text-sm ">
            <Input
              placeholder="Пробег до"
              type="number"
              min={0}
              value={mileageMax ? Number(mileageMax) : ""}
              onChange={(e) => onChengeMileageMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <Input
              placeholder="Объем от"
              type="number"
              min={0}
              value={engineMin ? Number(engineMin) : ""}
              onChange={(e) => onChangeEngineMin(e.target.value)}
            />
          </div>
          <div className=" w-full text-sm ">
            <Input
              placeholder="Объем до"
              type="number"
              min={0}
              value={engineMax ? Number(engineMax) : ""}
              onChange={(e) => onChangeEngineMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <Input
              placeholder="Цена от, тыс. вон"
              type="number"
              min={0}
              value={priceMin ? Number(priceMin) : ""}
              onChange={(e) => onChangePriceMin(e.target.value)}
            />
          </div>
          <div className=" w-full text-sm ">
            <Input
              placeholder="до"
              type="number"
              min={0}
              value={priceMax ? Number(priceMax) : ""}
              onChange={(e) => onChangePriceMax(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
interface Props<T> {
  onChangeEngineMin: (value: T) => void;
  onChangeEngineMax: (value: T) => void;
  onChangePriceMin: (value: T) => void;
  onChangePriceMax: (value: T) => void;
  onChengeMileageMin: (value: T) => void;
  onChengeMileageMax: (value: T) => void;
  engineMin: string | null;
  engineMax: string | null;
  priceMin: string | null;
  priceMax: string | null;
  mileageMin: string | null;
  mileageMax: string | null;
}
