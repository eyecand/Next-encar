"use client";

import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

import { optionMakes } from "./constant";
import { iOption, ModelProps, Option } from "./model";
import { detectMake } from "./lib";
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { useYears } from "@/hooks";

export const FirstLine: React.FC<Props<string | null>> = ({
  onChangeYearMin,
  onChangeYearMax,
  yearMin,
  yearMax,
  onChangeMakes,
  onChangeModels,
  make,
  model,
}) => {
  const { optionYears, yearsLoading } = useYears();
  const [mod, setMod] = useState<ModelProps[]>([]);
  const [isMod, setIsMod] = useState(false);
  useEffect(() => {
    async function filterModels(params: string) {
      try {
        setIsMod(true);
        const response = await Api.models.getModels(params);
        setMod(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsMod(false);
      }
    }

    filterModels(String(make));
  }, [make]);
  const optionsModels: Option[] = [
    {
      value: null,
      label: "Любая модель",
    },
  ];
  mod.map((item) => {
    return optionsModels.push({
      value: item.model_short_name,
      label: item.model_short_name,
    });
  });
  const handleMakesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeMakes(selectedOptions?.value);
    onChangeModels(null);
  };
  const handleModelsChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeModels(selectedOptions?.value);
  };
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"make"}
              placeholder="Любая марка"
              options={optionMakes}
              value={
                make
                  ? [
                      {
                        value: make,
                        label: detectMake(make),
                      },
                    ]
                  : []
              }
              onChange={(option) => handleMakesChange(option as iOption)}
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"model"}
              placeholder="Любая модель"
              isLoading={isMod}
              options={optionsModels}
              value={
                model
                  ? [
                      {
                        value: model,
                        label: model,
                      },
                    ]
                  : []
              }
              onChange={(option) => handleModelsChange(option as iOption)}
              isDisabled={!Boolean(make)}
            />
          </div>
        </div>
      </div>
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
    </>
  );
};
interface Props<T> {
  onChangeMakes: (value: T) => void;
  onChangeModels: (value: T) => void;
  onChangeYearMin: (value: T) => void;
  onChangeYearMax: (value: T) => void;
  make: string | null;
  model: string | null;
  yearMin: string | null;
  yearMax: string | null;
}
