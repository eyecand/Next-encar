"use client";

import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { EvolutionProps, iOption, Option } from "./model";
import { Checkbox } from "@/components/ui/checkbox";

export const FiveLine: React.FC<Props<string | null>> = ({
  make,
  model,
  isChecked,
  setIsChecked,
  evolution,
  onChangeEvolution,
  onChangeCheck,
}) => {
  const [evolutions, setEvolutions] = useState<EvolutionProps[]>([]);
  const [isEvolution, setIsEvolution] = useState(false);

  useEffect(() => {
    async function filterEvolution(make: string | null, model: string | null) {
      try {
        setIsEvolution(true);
        const response = await Api.evolution.getEvolution(make, model);
        setEvolutions(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsEvolution(false);
      }
    }
    filterEvolution(make, model);
  }, [make, model]);
  useEffect(() => {
    const valueToSend = isChecked ? "2" : "1";
    onChangeCheck(valueToSend);
  }, [isChecked]);
  const optionsEvolution: Option[] = [
    {
      value: null,
      label: "Все поколения",
    },
  ];
  evolutions
    .sort((a, b) => a.model_english.localeCompare(b.model_english))
    .map((item) => {
      return optionsEvolution.push({
        value: item.model_english,
        label: item.model_english,
      });
    });
  const handleEvolutionChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeEvolution(selectedOptions?.value);
  };

  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"evolution"}
              placeholder="Поколение"
              options={optionsEvolution}
              isLoading={isEvolution}
              value={
                evolution
                  ? [
                      {
                        value: evolution,
                        label: evolution,
                      },
                    ]
                  : []
              }
              onChange={(option) => handleEvolutionChange(option as iOption)}
              isDisabled={!Boolean(model)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row mt-1.5  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
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
  onChangeEvolution: (value: T) => void;
  onChangeCheck: (value: T) => void;
  setIsChecked: (value: boolean) => void;
  isChecked: boolean;
  make: string | null;
  model: string | null;
  evolution: string | null;
}
