"use client";

import { detectFuels } from "@/lib/detect-fuels";
import { optionFuels, optionPrivod } from "./constant";

import dynamic from "next/dynamic";
import { iOption, Option } from "./model";
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { GradesProps } from "@/services/grades";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const SecondLine: React.FC<Props<string | null>> = ({
  onChangeFuels,
  onChangePrivod,
  onChangeGrade,
  onChangeGradeEnglish,
  onChangeGradeDetail,
  fuels,
  privod,
  grade,
  make,
  model,
}) => {
  const [grades, setGrades] = useState<GradesProps[]>([]);
  const [isGrades, setIsGrades] = useState(false);
  useEffect(() => {
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

    if (Boolean(make) && Boolean(model)) {
      filterGrades(make, model);
    }
  }, [make, model]);
  const optionsGrades: Option[] = [
    {
      value: null,
      label: "Любая комплектация",
    },
  ];
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
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"fuels"}
              placeholder="Любой тип топлива"
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
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"privod"}
              placeholder="Любой привод"
              options={optionPrivod}
              value={
                privod
                  ? [
                      {
                        value: privod,
                        label: privod,
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangePrivod((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
interface Props<T> {
  onChangeFuels: (value: T) => void;
  onChangePrivod: (value: T) => void;
  onChangeGrade: (value: T) => void;
  onChangeGradeEnglish: (value: T) => void;
  onChangeGradeDetail: (value: T) => void;
  fuels: string | null;
  privod: string | null;
  make: string | null;
  model: string | null;
  grade: string | null;
}
