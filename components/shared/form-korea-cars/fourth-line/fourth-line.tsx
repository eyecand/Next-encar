"use client";

import dynamic from "next/dynamic";
import { optionCities } from "./constanst";
import { iOption, Option } from "./model";
import { useEffect, useState } from "react";
import { useCityState } from "@/store/city-filter";
import { useYears } from "@/hooks";
import { GradesProps } from "@/services/grades";
import { Api } from "@/services/api-client";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const FourthLine: React.FC<Props<string | null>> = ({
  onChangeCities,
  cities,
  onChangeYearMin,
  onChangeYearMax,
  onChangeGrade,
  onChangeGradeEnglish,
  onChangeGradeDetail,
  yearMin,
  yearMax,
  grade,
  make,
  model,
}) => {
  const { optionYears, yearsLoading } = useYears();
  const [grades, setGrades] = useState<GradesProps[]>([]);
  const [isGrades, setIsGrades] = useState(false);
  const setCityState = useCityState((state) => state.setCityState);
  useEffect(() => {
    setCityState(Number(cities));
  }, [cities]);
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
  onChangeCities: (value: T) => void;
  onChangeYearMin: (value: T) => void;
  onChangeYearMax: (value: T) => void;
  onChangeGrade: (value: T) => void;
  onChangeGradeEnglish: (value: T) => void;
  onChangeGradeDetail: (value: T) => void;
  cities: string | null;
  yearMin: string | null;
  yearMax: string | null;
  make: string | null;
  model: string | null;
  grade: string | null;
}
