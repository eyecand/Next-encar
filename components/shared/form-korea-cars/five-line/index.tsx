"use client";

import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

import { useEffect } from "react";
import { iOption } from "./model";
import { Checkbox } from "@/components/ui/checkbox";
import { optionBenefit } from "../fourth-line/constanst";

export const FiveLine: React.FC<Props<string | null>> = ({
  isChecked,
  insuarePrice,
  setIsChecked,
  onChangeCheck,
  onChangeInsuarePrice,
}) => {
  useEffect(() => {
    const valueToSend = isChecked ? "2" : "1";
    onChangeCheck(valueToSend);
  }, [isChecked]);

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

      <div className="col-span-12 md:col-span-8 lg:col-span-8">
        <div className=" p-0.5  flex flex-row lg:justify-end mt-1.5  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="rounded-[8px] w-6 h-6 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            />
            <label
              htmlFor={`checkbox-${String(1)}-${String(1)}`}
              className="leading-none cursor-pointer flex-1"
            >
              Проходной
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
interface Props<T> {
  onChangeCheck: (value: T) => void;
  setIsChecked: (value: boolean) => void;
  onChangeInsuarePrice: (value: T) => void;
  isChecked: boolean;
  insuarePrice: string | null;
}
