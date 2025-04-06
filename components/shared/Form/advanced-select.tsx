"use client";
import dynamic from "next/dynamic";
import { Input } from "../../ui/input";
import React from "react";
import { iOption, Option } from "./model";
interface Props<T> {
  onChangeEngineMin: (value: T) => void;
  onChangeEngineMax: (value: T) => void;
  onChangeBuisness: (value: T) => void;
  onChangeRobber: (value: T) => void;
  onChangeNomer: (value: T) => void;
  onChangeOwner: (value: T) => void;
  onChangeInsuare: (value: T) => void;
  onChangeInsuarePrice: (value: T) => void;
  count: number | undefined;
  insuare: string | null;
  engineMin: string | null;
  engineMax: string | null;
  buisness: string | null;
  robber: string | null;
  changeOwner: string | null;
  changeNumber: string | null;
  insuarePrice: string | null;
}

const NoSSR = dynamic(() => import("react-select"), { ssr: false });
export const AdvancedSelect: React.FC<Props<string | null>> = ({
  onChangeEngineMin,
  onChangeEngineMax,
  onChangeBuisness,
  onChangeRobber,
  onChangeNomer,
  onChangeOwner,
  onChangeInsuare,
  onChangeInsuarePrice,
  insuare,
  count,
  engineMin,
  engineMax,
  buisness,
  robber,
  changeOwner,
  changeNumber,
  insuarePrice,
}) => {
  const optionCounts: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const currentCount = count ? count : 0;
  const optionInsuarePrice = [
    {
      label: "Любая",
    },
    {
      value: 1,
      label: "до 1000000 W",
    },
    {
      value: 2,
      label: "до 1000000 - 3000000 W",
    },
    {
      value: 3,
      label: "больше 3000000 W",
    },
  ];
  if (currentCount)
    for (let i = 1; i <= currentCount; i++) {
      optionCounts.push({ value: String(i), label: String(i) });
    }
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <Input
              placeholder={`Объем от, см3`}
              type="number"
              min={0}
              value={engineMin ? Number(engineMin) : ""}
              onChange={(e) => onChangeEngineMin(e.target.value)}
            />
          </div>
          <div className=" w-full text-sm ">
            <Input
              placeholder="до"
              type="number"
              value={engineMax ? Number(engineMax) : ""}
              min={0}
              onChange={(e) => onChangeEngineMax(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Вид использования"
              options={[
                {
                  value: 1,
                  label: "Личный",
                },
                {
                  value: 2,
                  label: "Бизнес",
                },
              ]}
              value={
                buisness
                  ? [
                      {
                        value: Number(buisness),
                        label: Number(buisness) === 2 ? "Бизнес" : "Личный",
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeBuisness((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Кража"
              options={[
                {
                  value: 1,
                  label: "Нет",
                },
                {
                  value: 2,
                  label: "Да",
                },
              ]}
              value={
                robber
                  ? [
                      {
                        value: Number(robber),
                        label: Number(robber) === 2 ? "Да" : "Нет",
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeRobber((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Количество номеров"
              options={optionCounts}
              value={
                changeNumber
                  ? optionCounts.filter((item) => item.value === changeNumber)
                  : []
              }
              onChange={(option) => {
                onChangeNomer((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Количество владельцев"
              options={optionCounts}
              value={
                changeOwner
                  ? optionCounts.filter((item) => item.value === changeOwner)
                  : []
              }
              onChange={(option) => {
                onChangeOwner((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR
              placeholder="Страховая выплата"
              options={[
                {
                  value: 1,
                  label: "Нет",
                },
                {
                  value: 2,
                  label: "Да",
                },
              ]}
              value={
                insuare
                  ? [
                      {
                        value: Number(insuare),
                        label: Number(insuare) === 2 ? "Да" : "Нет",
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeInsuare((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
      {Number(insuare) === 2 && (
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
            <div className=" w-full text-sm ">
              <NoSSR
                placeholder="Страховая выплата"
                options={optionInsuarePrice}
                value={
                  insuarePrice
                    ? optionInsuarePrice.filter(
                        (item) => item.value === Number(insuarePrice)
                      )
                    : []
                }
                onChange={(option) => {
                  onChangeInsuarePrice((option as iOption).value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
