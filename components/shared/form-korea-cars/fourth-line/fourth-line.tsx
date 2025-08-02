"use client";

import dynamic from "next/dynamic";
import { optionBenefit, optionCities } from "./constanst";
import { iOption } from "./model";
import { useEffect } from "react";
import { useCityState } from "@/store/city-filter";
import { Input } from "@/components/ui/input";

const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const FourthLine: React.FC<Props<string | null>> = ({
  onChangeCities,
  cities,
  onChangePriceMin,
  onChangeInsuarePrice,
  onChangePriceMax,
  priceMin,
  priceMax,
  insuarePrice,
}) => {
  const setCityState = useCityState((state) => state.setCityState);
  useEffect(() => {
    setCityState(Number(cities));
  }, [cities]);

  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
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
          <div className=" w-full text-[16px] md:text-sm ">
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
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <Input
              placeholder="Цена от, тыс. вон"
              type="number"
              min={0}
              value={priceMin ? Number(priceMin) : ""}
              onChange={(e) => onChangePriceMin(e.target.value)}
            />
          </div>
          <div className=" w-full text-[16px] md:text-sm ">
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
  onChangeCities: (value: T) => void;
  onChangePriceMin: (value: T) => void;
  onChangePriceMax: (value: T) => void;
  onChangeInsuarePrice: (value: T) => void;
  cities: string | null;
  priceMin: string | null;
  priceMax: string | null;
  insuarePrice: string | null;
}
