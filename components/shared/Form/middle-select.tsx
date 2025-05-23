"use client";
import { useFuels, useYears } from "@/hooks";
import dynamic from "next/dynamic";
import { Input } from "../../ui/input";
import { detectFuels } from "@/lib/detect-fuels";
import { iOption } from "./model";

interface Props<T> {
  onChangeFuels: (value: T) => void;
  onChangeYearMin: (value: T) => void;
  onChangeYearMax: (value: T) => void;
  onChangePriceMin: (value: T) => void;
  onChangePriceMax: (value: T) => void;
  fuels: string | null;
  yearMin: string | null;
  yearMax: string | null;
  priceMin: string | null;
  priceMax: string | null;
}

const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const MiddleSelect: React.FC<Props<string | null>> = ({
  onChangeFuels,
  onChangeYearMin,
  onChangeYearMax,
  onChangePriceMin,
  onChangePriceMax,
  priceMin,
  priceMax,
  fuels,
  yearMin,
  yearMax,
}) => {
  const { optionFuels } = useFuels();
  const { optionYears, yearsLoading } = useYears();
  return (
    <>
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
              value={priceMax ? Number(priceMax) : ""}
              min={0}
              onChange={(e) => onChangePriceMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              classNamePrefix="yearMin"
              placeholder="Год от"
              options={optionYears}
              isLoading={yearsLoading}
              isDisabled={yearsLoading}
              value={
                yearMin
                  ? [
                      {
                        value: yearMin,
                        label: yearMin,
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeYearMin((option as iOption).value);
              }}
            />
          </div>
          <div className=" w-full text-sm ">
            <NoSSR
              classNamePrefix="yearMax"
              placeholder="до"
              options={optionYears}
              isLoading={yearsLoading}
              isDisabled={yearsLoading}
              value={
                yearMax
                  ? [
                      {
                        value: yearMax,
                        label: yearMax,
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeYearMax((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Топливо"
              options={optionFuels}
              value={
                fuels
                  ? [
                      {
                        value: fuels,
                        label: detectFuels(fuels),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeFuels((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
