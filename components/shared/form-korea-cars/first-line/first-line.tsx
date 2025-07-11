"use client";

import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

import { optionMakes } from "./constant";
import { iOption, ModelProps, Option } from "./model";
import { detectMake } from "./lib";
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { GradesProps } from "@/services/grades";

export const FirstLine: React.FC<Props<string | null>> = ({
  onChangeMakes,
  onChangeModels,
  onChangeGrade,
  onChangeGradeEnglish,
  onChangeGradeDetail,
  onChangeEvolution,
  make,
  model,
  grade,
}) => {
  const [mod, setMod] = useState<ModelProps[]>([]);
  const [isMod, setIsMod] = useState(false);
  const [grades, setGrades] = useState<GradesProps[]>([]);
  const [isGrades, setIsGrades] = useState(false);
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
    async function filterGrades(makes: string | null, model: string | null) {
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
      filterModels(String(make));
    }

    if (Boolean(make) && Boolean(model)) {
      filterGrades(make, model);
    }
  }, [make, model]);
  const optionsModels: Option[] = [
    {
      value: null,
      label: "Любая модель",
    },
  ];
  const optionsGrades: Option[] = [
    {
      value: null,
      label: "Любая комплектация",
    },
  ];

  mod
    .sort((a, b) => a.model_short_name.localeCompare(b.model_short_name))
    .map((item) => {
      return optionsModels.push({
        value: item.model_short_name,
        label:
          item.model_short_name === "Canival"
            ? "Carnival"
            : item.model_short_name,
      });
    });

  grades
    .sort((a, b) => a.grade_english.localeCompare(b.grade_english))
    .map((item) => {
      const grade_eng = item.grade_english === null ? "" : item.grade_english;
      const grade_detail =
        item.grade_detail_english === null
          ? ""
          : " " + item.grade_detail_english;
      return optionsGrades.push({
        value:
          grade_eng.replace(" China Manufacturer", "") +
          grade_detail.replace(" China Manufacturer", ""),
        label:
          grade_eng.replace(" China Manufacturer", "") +
          grade_detail.replace(" China Manufacturer", ""),
      });
    });

  const handleMakesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeMakes(selectedOptions?.value);
    onChangeModels(null);
    onChangeGrade(null);
    onChangeGradeEnglish(null);
    onChangeGradeDetail(null);
    onChangeEvolution(null);
  };
  const handleModelsChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeModels(selectedOptions?.value);
    onChangeGrade(null);
    onChangeGradeEnglish(null);
    onChangeGradeDetail(null);
    onChangeEvolution(null);
  };
  const handleGradesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) {
      const foundItem = grades.find((item) => {
        const combinedString =
          item.grade_english +
          (item.grade_detail_english ? " " + item.grade_detail_english : "");
        return (
          combinedString.replace(" China Manufacturer", "") ===
          selectedOptions.value
        );
      });
      onChangeGrade(selectedOptions.value);
      if (foundItem) {
        onChangeGradeEnglish(String(foundItem?.grade_english));
        onChangeGradeDetail(String(foundItem?.grade_detail_english));
      } else {
        onChangeGradeEnglish(null);
        onChangeGradeDetail(null);
      }
    }
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
                        label: model === "Canival" ? "Carnival" : model,
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
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"grades"}
              placeholder="Любая комплектация"
              isLoading={isGrades}
              options={optionsGrades}
              value={
                grade
                  ? [
                      {
                        value: grade,
                        label: grade,
                      },
                    ]
                  : []
              }
              onChange={(option) => handleGradesChange(option as iOption)}
              isDisabled={!Boolean(model)}
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
  onChangeGrade: (value: T) => void;
  onChangeGradeEnglish: (value: T) => void;
  onChangeGradeDetail: (value: T) => void;
  onChangeEvolution: (value: T) => void;
  make: string | null;
  model: string | null;
  grade: string | null;
}
