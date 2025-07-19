"use client";

import { detectFuels } from "@/lib/detect-fuels";
import { optionFuels, optionPrivod } from "./constant";

import dynamic from "next/dynamic";
import { iOption } from "./model";

import { optionTramsmission } from "../second-line/constant";
import { detectTransmission } from "../second-line/lib";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const SecondLine: React.FC<Props<string | null>> = ({
  onChangeFuels,
  onChangePrivod,
  onChangeTransmission,
  fuels,
  privod,
  transmission,
}) => {
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <NoSSR
              classNamePrefix={"transmission"}
              placeholder="Любая трансмиссия"
              options={optionTramsmission}
              value={
                transmission
                  ? [
                      {
                        value: transmission,
                        label: detectTransmission(transmission),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                onChangeTransmission((option as iOption).value);
              }}
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
  onChangeTransmission: (value: T) => void;
  fuels: string | null;
  privod: string | null;
  transmission: string | null;
}
