"use client";

import { GradesProps } from "@/services/grades";
import dynamic from "next/dynamic";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
import { Option } from "../form-korea-cars/fourth-line/model";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });
interface iOption {
  value: string;
  label: string;
}

export const TherdLine: React.FC<Props<string | null>> = ({
  onChangeEngineMin,
  onChangeEngineMax,
  onChangeGrade,
  onChangeGradeEnglish,
  onChangeGradeDetail,
  onChengeMileageMin,
  onChengeMileageMax,
  engineMin,
  engineMax,
  mileageMin,
  mileageMax,
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
  onChangeGrade: (value: T) => void;
  onChangeGradeEnglish: (value: T) => void;
  onChangeGradeDetail: (value: T) => void;
  engineMin: string | null;
  engineMax: string | null;
  make: string | null;
  model: string | null;
  grade: string | null;
  mileageMin: string | null;
  mileageMax: string | null;
}
