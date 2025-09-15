"use client";

import type React from "react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import qs from "qs";
import { useFilters } from "@/hooks/use-filters";
import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FirstLine } from "./first-line/first-line";
import { SecondLine } from "./second-line/second-line";
import { TherdLine } from "./third-line";
import { FourthLine } from "./fourth-line/fourth-line";
import { ButtonSubmit } from "../button-submit";
import { optionSort } from "./fourth-line/constanst";
import { detectSort } from "./fourth-line/lib";
import type { iOption } from "./fourth-line/model";
import { FiveLine } from "./five-line";

export interface Option {
  value: string | null;
  label: string | null;
}

const NoSSR = dynamic(() => import("react-select"), {
  ssr: false,
}) as React.ComponentType<{
  classNamePrefix?: string;
  placeholder?: string;
  options: Option[];
  value: Option[];
  onChange: (newValue: iOption | null) => void;
}>;

export const FormKoreaCars = ({ total }: { total: string }) => {
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedNewCar, setIsCheckedNewCar] = useState(false);
  const [isCheckedOldCar, setIsCheckedOldCar] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    searchParams.get("grades")
      ? searchParams.get("grades")?.split(",") || []
      : []
  );
  const [selectedGrageEng, setSelectedGrageEng] = useState<string[]>(
    searchParams.get("grade_eng")
      ? searchParams.get("grade_eng")?.split(",") || []
      : []
  );
  const [selectedGrageDet, setSelectedGrageDet] = useState<string[]>(
    searchParams.get("grade_detail")
      ? searchParams.get("grade_detail")?.split(",") || []
      : []
  );

  const router = useRouter();
  const filters = useFilters();
  const { makes, model, evolutions } = useParams();

  useEffect(() => {
    if (makes) filters.setMakesType(decodeURIComponent(String(makes)));
    if (model) filters.setModelType(decodeURIComponent(String(model)));
    if (evolutions)
      filters.setEvolutionsType(decodeURIComponent(String(evolutions)));
  }, [makes, model, evolutions]);

  const handleSortChange = useCallback(
    (selectedOption: iOption | null) => {
      if (!selectedOption) return;
      const newSortValue = selectedOption.value;
      console.log("опции", selectedOption.value);
      console.log("start", filters.sort);
      filters.setSort(newSortValue);
      console.log("stop", filters.sort);
      const currentParams = {
        grades:
          selectedValues.length > 0 ? Array.from(selectedValues) : undefined,
        grades_eng:
          selectedGrageEng.length > 0
            ? Array.from(selectedGrageEng)
            : undefined,
        grades_det:
          selectedGrageDet.length > 0
            ? Array.from(selectedGrageDet)
            : undefined,
        fuels: filters.fuels,
        yearsMin: filters.yearsMin,
        yearsMax: filters.yearsMax,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        engineMin: filters.engineMin,
        engineMax: filters.engineMax,
        buisness: filters.buisness,
        robber: filters.robber,
        changeNumber: filters.changeNumber,
        changeOwner: filters.changeOwner,
        insuare: filters.insuare,
        insuarePrice: filters.insuarePrice,
        sort: newSortValue,
        privod: filters.privod,
        transmission: filters.transmission,
        mileageMin: filters.mileageMin,
        mileageMax: filters.mileageMax,
        cities: filters.cities,
        check: filters.check,
        checkNew: filters.checkNewCar,
        checkOld: filters.checkOldCar,
      };

      const queryUrl = qs.stringify(currentParams, {
        arrayFormat: "comma",
        skipNulls: true,
      });

      router.push(
        `${filters.makesType ? "/" + filters.makesType : ""}${
          filters.modelType ? "/" + filters.modelType : ""
        }${
          filters.evolutonsType ? "/" + filters.evolutonsType : ""
        }?${queryUrl}`,
        {
          scroll: false,
        }
      );
    },
    [filters, selectedValues, router]
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const params = {
      grades:
        selectedValues.length > 0 ? Array.from(selectedValues) : undefined,
      grades_eng:
        selectedGrageEng.length > 0 ? Array.from(selectedGrageEng) : undefined,
      grades_det:
        selectedGrageDet.length > 0 ? Array.from(selectedGrageDet) : undefined,
      fuels: filters.fuels,
      yearsMin: filters.yearsMin,
      yearsMax: filters.yearsMax,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      engineMin: filters.engineMin,
      engineMax: filters.engineMax,
      buisness: filters.buisness,
      robber: filters.robber,
      changeNumber: filters.changeNumber,
      changeOwner: filters.changeOwner,
      insuare: filters.insuare,
      insuarePrice: filters.insuarePrice,
      sort: filters.sort,
      privod: filters.privod,
      transmission: filters.transmission,
      mileageMin: filters.mileageMin,
      mileageMax: filters.mileageMax,
      cities: filters.cities,
      check: filters.check,
      checkNew: filters.checkNewCar,
      checkOld: filters.checkOldCar,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });

    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL}${
        filters.makesType ? "/" + filters.makesType : ""
      }${filters.modelType ? "/" + filters.modelType : ""}${
        filters.evolutonsType ? "/" + filters.evolutonsType : ""
      }?${query}`,
      {
        scroll: false,
      }
    );
  };

  const handleRemove = () => {
    filters.setMakesType(null);
    filters.setModelType(null);
    filters.setPrivod(null);
    filters.setFuels(null);
    filters.setYearsMin(null);
    filters.setYearsMax(null);
    filters.setTransmission(null);
    filters.setPriceMin(null);
    filters.setPriceMax(null);
    filters.setEngineMin(null);
    filters.setEngineMax(null);
    filters.setMileageMin(null);
    filters.setMileageMax(null);
    filters.setInsuarePrice(null);
    filters.setCities(null);
    filters.setSort(null);
    filters.setGradesType("");
    filters.setGradesEng("");
    filters.setGradesDetail("");
    filters.setEvolutionsType(null);
    setIsChecked(false);
    setIsCheckedNewCar(false);
    setIsCheckedOldCar(false);
    setSelectedValues([]);
    setSelectedGrageEng([]);
    setSelectedGrageDet([]);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sm:mx-0 text-zinc-800 max-w-7xl mt-10 bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-t-xl p-3 sm:p-4 lg:p-5 gap-2 transition-opacity duration-400 ease-in"
      >
        <FirstLine
          onChangeMakes={filters.setMakesType}
          onChangeModels={filters.setModelType}
          onChangeGrade={setSelectedValues}
          onChangeGradeEnglish={setSelectedGrageEng}
          onChangeGradeDetail={setSelectedGrageDet}
          onChangeEvolution={filters.setEvolutionsType}
          make={filters.makesType}
          model={filters.modelType}
          evolution={filters.evolutonsType}
          grade={selectedValues}
        />
        <TherdLine
          engineMax={filters.engineMax}
          engineMin={filters.engineMin}
          mileageMin={filters.mileageMin}
          mileageMax={filters.mileageMax}
          onChangeEngineMax={filters.setEngineMax}
          onChangeEngineMin={filters.setEngineMin}
          onChengeMileageMin={filters.setMileageMin}
          onChengeMileageMax={filters.setMileageMax}
          onChangeYearMin={filters.setYearsMin}
          onChangeYearMax={filters.setYearsMax}
          yearMin={filters.yearsMin}
          yearMax={filters.yearsMax}
        />
        <SecondLine
          transmission={filters.transmission}
          onChangeFuels={filters.setFuels}
          onChangePrivod={filters.setPrivod}
          onChangeTransmission={filters.setTransmission}
          fuels={filters.fuels}
          privod={filters.privod}
        />
        <FourthLine
          priceMax={filters.priceMax}
          priceMin={filters.priceMin}
          cities={filters.cities}
          insuarePrice={filters.insuarePrice}
          onChangeCities={filters.setCities}
          onChangePriceMax={filters.setPriceMax}
          onChangePriceMin={filters.setPriceMin}
          onChangeInsuarePrice={filters.setInsuarePrice}
        />
        <FiveLine
          isChecked={isChecked}
          isCheckedNewCar={isCheckedNewCar}
          isCheckedOldCar={isCheckedOldCar}
          setIsChecked={setIsChecked}
          setIsCheckedNewCar={setIsCheckedNewCar}
          setIsCheckedOldCar={setIsCheckedOldCar}
          onChangeCheck={filters.setCheck}
          onChangeCheckNew={filters.setCheckNewCar}
          onChangeCheckOld={filters.setCheckOldCar}
        />

        <ButtonSubmit handleRemove={handleRemove} />
      </form>
      <div className="max-w-7xl p-5">
        <div className=" border-b-2 py-5 flex justify-between items-center">
          <h2 className="inline-block font-bold text-base sm:text-xl relative subtitle-page">
            {total} объявления
          </h2>
          <div className="w-40 text-[16px] sm:w-52 md:text-sm ">
            <NoSSR
              classNamePrefix={"sort"}
              placeholder="Сортировка"
              options={optionSort}
              value={
                filters.sort
                  ? [
                      {
                        value: filters.sort,
                        label: detectSort(filters.sort),
                      },
                    ]
                  : []
              }
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
