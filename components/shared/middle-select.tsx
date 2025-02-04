"use client";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });
export const MiddleSelect = () => {
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR classNamePrefix="priceMin" placeholder="Цена от, Р" />
          </div>
          <div className=" w-full text-sm ">
            <NoSSR classNamePrefix="priceMax" placeholder="до" />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5 gap-[0.5px] flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR classNamePrefix="yearMin" placeholder="Год от" />
          </div>
          <div className=" w-full text-sm ">
            <NoSSR classNamePrefix="yearMax" placeholder="до" />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-blue-600  rounded-lg ">
          <div className=" w-full text-sm ">
            <NoSSR placeholder="Топливо" />
          </div>
        </div>
      </div>
    </>
  );
};
