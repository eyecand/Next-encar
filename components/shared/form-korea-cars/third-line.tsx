"use client";

import { useYears } from "@/hooks";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });
interface iOption {
  value: string;
  label: string;
}

export const TherdLine: React.FC<Props<string | null>> = ({
  onChangeEngineMin,
  onChangeEngineMax,
  onChangeYearMin,
  onChangeYearMax,
  onChengeMileageMin,
  onChengeMileageMax,
  engineMin,
  engineMax,
  mileageMin,
  mileageMax,
  yearMin,
  yearMax,
}) => {
  const { optionYears, yearsLoading } = useYears();
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
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix="yearMax"
              placeholder="Год до"
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
              classNamePrefix="engineMax"
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
    </>
  );
};
interface Props<T> {
  onChangeEngineMin: (value: T) => void;
  onChangeEngineMax: (value: T) => void;
  onChengeMileageMin: (value: T) => void;
  onChengeMileageMax: (value: T) => void;
  onChangeYearMin: (value: T) => void;
  onChangeYearMax: (value: T) => void;
  engineMin: string | null;
  engineMax: string | null;
  mileageMin: string | null;
  mileageMax: string | null;
  yearMin: string | null;
  yearMax: string | null;
}
