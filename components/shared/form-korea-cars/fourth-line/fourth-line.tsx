"use client";

import dynamic from "next/dynamic";
import { optionCities, optionBenefit, optionSort } from "./constanst";
import { iOption } from "./model";
import { detectSort } from "./lib";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const FourthLine: React.FC<Props<string | null>> = ({
  onChangeInsuarePrice,
  onChangeCities,
  onChangeSort,
  insuarePrice,
  cities,
  sort,
}) => {
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              classNamePrefix={"benifit"}
              placeholder="Выплаты"
              options={optionBenefit}
              value={
                insuarePrice
                  ? optionBenefit.filter(
                      (item) => Number(item.value) === Number(insuarePrice)
                    )
                  : []
              }
              onChange={(option) => {
                onChangeInsuarePrice((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              classNamePrefix={"city"}
              placeholder="Владивосток"
              options={optionCities}
              value={
                cities
                  ? optionCities.filter(
                      (item) => Number(item.value) === Number(cities)
                    )
                  : []
              }
              onChange={(option) => {
                onChangeCities((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              classNamePrefix={"sort"}
              placeholder="Сортировка"
              options={optionSort}
              value={
                sort
                  ? [
                      {
                        value: sort,
                        label: detectSort(sort),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeSort((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
interface Props<T> {
  onChangeInsuarePrice: (value: T) => void;
  onChangeCities: (value: T) => void;
  onChangeSort: (value: T) => void;
  insuarePrice: string | null;
  cities: string | null;
  sort: string | null;
}
