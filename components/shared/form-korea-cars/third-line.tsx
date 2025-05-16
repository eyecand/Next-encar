"use client";

import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });
interface iOption {
  value: string;
  label: string;
}

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
  const optionsEngine: { value: string | null; label: string }[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const optionsMileage: { value: string | null; label: string }[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  for (let i = 0.5; i <= 6; i += 0.1) {
    optionsEngine.push({ value: i.toFixed(1), label: `${i.toFixed(1)}` });
  }
  for (let i = 10000; i <= 200000; i += 10000) {
    optionsMileage.push({
      value: `${i}`,
      label: `${new Intl.NumberFormat("ru-RU")
        .format(Number(i))
        .replace(",", ".")}`,
    });
  }
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix="mileageMin"
              placeholder="Пробег от"
              options={optionsMileage}
              value={
                mileageMin
                  ? [
                      {
                        value: new Intl.NumberFormat("ru-RU")
                          .format(Number(mileageMin))
                          .replace(",", "."),
                        label: new Intl.NumberFormat("ru-RU")
                          .format(Number(mileageMin))
                          .replace(",", "."),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChengeMileageMin((option as iOption).value);
              }}
            />
          </div>
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix="mileageMax"
              placeholder="Пробег до"
              options={optionsMileage}
              value={
                mileageMax
                  ? [
                      {
                        value: new Intl.NumberFormat("ru-RU")
                          .format(Number(mileageMax))
                          .replace(",", "."),
                        label: new Intl.NumberFormat("ru-RU")
                          .format(Number(mileageMax))
                          .replace(",", "."),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChengeMileageMax((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix="engineMin"
              placeholder="Объем от"
              options={optionsEngine}
              value={
                engineMin
                  ? [
                      {
                        value: engineMin,
                        label: engineMin,
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeEngineMin((option as iOption).value);
              }}
            />
          </div>
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix="engineMin"
              placeholder="Объем до"
              options={optionsEngine}
              value={
                engineMax
                  ? [
                      {
                        value: engineMax,
                        label: engineMax,
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeEngineMax((option as iOption).value);
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
