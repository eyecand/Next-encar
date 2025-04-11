"use client";
import { useMakes } from "@/hooks/useMakes";
import { Api } from "@/services/api-client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GradesProps, ModelProps, Option, iOption } from "./model";
interface Props<T> {
  onChangeMakes: (value: T) => void;
  onChangeModels: (value: T) => void;
  onChangeGrades: (value: T) => void;
  make: string | null;
  model: string | null;
  grade: string | null;
}
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const BasicSelect: React.FC<Props<string | null>> = ({
  onChangeMakes,
  onChangeModels,
  onChangeGrades,
  make,
  model,
  grade,
}) => {
  const { makes } = useMakes();

  const [mod, setMod] = useState<ModelProps[]>([]);
  const [grades, setGrades] = useState<GradesProps[]>([]);
  const [isMod, setIsMod] = useState(false);
  const [isGrades, setIsGrades] = useState(false);

  const optionMakes: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const optionsModels: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const optionsGrades: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  makes.map((item) => {
    return optionMakes.push({
      value: item.make_short_name,
      label: item.make_short_name,
    });
  });
  mod.map((item) => {
    return optionsModels.push({
      value: item.model_short_name,
      label: item.model_short_name,
    });
  });

  grades.map((item) => {
    return optionsGrades.push({
      value: item.grades.grade_english,
      label: item.grades.grade_english.replace(" China Manufacturer", ""),
    });
  });

  useEffect(() => {
    async function test(params: string) {
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
    async function grades(makes: string | null, model: string | null) {
      try {
        setIsGrades(true);
        const response = await Api.grades.getGrades(makes, model);

        setGrades(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsGrades(false);
      }
    }
    if (make) {
      test(make);
    }
    if (Boolean(make) && Boolean(model)) {
      grades(make, model);
    }
  }, [make, model]);

  const handleMakesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeMakes(selectedOptions?.value);
    onChangeModels(null);
    onChangeGrades(null);
  };
  const handleModelsChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeModels(selectedOptions?.value);
    onChangeGrades(null);
  };
  const handleGradesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeGrades(selectedOptions?.value);
  };

  return (
    <div className="flex flex-col sm:flex-row col-span-12 gap-6">
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          placeholder="Марка"
          defaultValue={[
            {
              value: make,
              label: make,
            },
          ]}
          options={optionMakes}
          value={
            make
              ? [
                  {
                    value: make,
                    label: make,
                  },
                ]
              : []
          }
          onChange={(option) => handleMakesChange(option as iOption)}
        />
      </div>
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          isLoading={isMod}
          placeholder="Модель"
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
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          isLoading={isGrades}
          placeholder="Комплектация"
          options={optionsGrades}
          value={
            grade
              ? [
                  {
                    value: grade.replace(" China Manufacturer", ""),
                    label: grade.replace(" China Manufacturer", ""),
                  },
                ]
              : []
          }
          onChange={(option) => handleGradesChange(option as iOption)}
          isDisabled={!Boolean(model)}
        />
      </div>
    </div>
  );
};
