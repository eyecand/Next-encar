import Link from "next/link";
import React from "react";
import DynamicImage from "./dynamic-image";

interface ReturnProps {
  vehicle: {
    id: bigint;
    details: {
      makes: {
        make_short_name: string | null;
      };
      model: {
        model_short_name: string | null;
      };
      grades: {
        grade_english: string | null;
      };
      form_year: number;
      origin_price: number | null;
      mileage: number;
      engine_displacement: number;
      fuel: {
        fuel_english: string | null;
      };
    } | null;
    photos: {
      url: string;
    }[];
  }[];
}
export const VehicleList: React.FC<ReturnProps> = ({ vehicle }) => {
  return (
    <>
      <div className="isMobil flex-col items-center sm:flex-row    p-4  pb-0 sm:flex-wrap">
        {vehicle.length > 0 &&
          vehicle.map(
            (item) =>
              item.details !== null && (
                <Link
                  key={item.id}
                  target="_blank"
                  href={`/vehicle/${item.id}`}
                  className={
                    "w-[320px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
                  }
                >
                  <div
                    className={`bg-white border-light-gray rounded-xl overflow-hidden flex flex-col relative
                  min-h-[300px] sm:transition-all border-[2.5px] sm:hover:shadow-xl sm:hover:-translate-y-2 shadow-md`}
                  >
                    <div className="w-full flex">
                      <DynamicImage url={item.photos[0].url} />
                    </div>

                    <div className="p-1 sm:p-2 md:p-3 lg:p-4 grow flex flex-col">
                      <div className="items-center justify-between min-h-[81px] flex gap-1 md:gap-3 py-1 md:py-3 text-gray-900 border-b border-gray-200 grow">
                        <span className="font-bold text-xs sm:text-base lg:text-lg font-gilroy">
                          {item.details.makes.make_short_name}{" "}
                          {item.details.model.model_short_name}
                        </span>
                      </div>
                      <div className="align-middle flex py-3 text-gray-900 text-[12px] lg:text-sm justify-between items-baseline border-b  border-gray-200 relative">
                        <span className="text-gray-500">Год:</span>
                        <div className="flex">
                          <span className="text-red-700 mx-[2px] md:mx-2">
                            {item.details.form_year}
                          </span>
                          <span className="whitespace-nowrap">
                            {item.details.grades.grade_english}
                          </span>
                        </div>
                      </div>
                      <div className="align-middle  text-[12px] lg:text-sm mx-[2px] flex py-3 whitespace-nowrap text-gray-900  justify-between items-baseline border-b  border-gray-200 relative">
                        <span className="text-gray-500 ">Двигатель:</span>
                        <div>
                          <span className="text-red-700 mx-[2px] md:mx-2">
                            {item.details.fuel.fuel_english}
                          </span>
                          <span className="text-gray-400 ml-2">
                            {item.details.engine_displacement} cc
                          </span>
                        </div>
                      </div>
                      <div className="align-middle flex py-3 text-[12px]  whitespace-nowrap text-gray-900  justify-between items-baseline border-b  border-gray-200 relative">
                        <span className="text-gray-500">Пробег:</span>
                        <div className="flex items-center space-x-2">
                          <span className="">{item.details.mileage} км</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center text-black text-wrap text-[14px] whitespace-nowrap font-semibold pb-5">
                      <span>{item.details.origin_price} W</span>
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
      <div className="Desktop flex-col gap-10  ">
        {vehicle.length > 0 &&
          vehicle.map(
            (item, index) =>
              item.details !== null && (
                <Link
                  key={index}
                  target="_blank"
                  href={`/vehicle/${item.id}`}
                  className=" p-5 max-w-5xl "
                >
                  <div className="flex justify-between relative card-car">
                    <div className="mr-5 max-w-[320px] max-h-[180px]">
                      <DynamicImage url={item.photos[0].url} />
                      {/* <Image
                        className="w-auto h-auto"
                        src={item.photos[0].url}
                        alt="#"
                        width={272}
                        height={204}
                      /> */}
                    </div>
                    <div className="params flex-grow-0 flex-shrink basis-[400px] min-w-[232px] mr-5">
                      <div className="title">
                        <h3 className="inline text-[18px] leading-[25px]">
                          {item.details.makes.make_short_name}{" "}
                          {item.details.model.model_short_name},{" "}
                          {item.details.form_year}
                        </h3>
                        <div className="text-[13px] leading-[20px] mt-1 text-gray-400">
                          {item.details.grades.grade_english}
                        </div>
                      </div>
                      <div className="middle mt-1 text-[15px] leading-6">
                        <span className="whitespace-nowrap">
                          {(
                            Math.round(item.details.engine_displacement) / 1000
                          ).toFixed(1)}{" "}
                          л,{" "}
                        </span>
                        <span className="whitespace-nowrap">
                          {item.details.fuel.fuel_english},{" "}
                        </span>
                        <span className="whitespace-nowrap">
                          {item.details.mileage} км
                        </span>
                      </div>
                      <div className="button flex ">
                        <div className="inline-flex bg-gray-300/50 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-2 py-[10px] rounded-xl mt-1">
                          без пробега по РФ
                        </div>
                      </div>
                    </div>
                    <div className="price flex flex-shrink-0 flex-grow-0 w-[140px]">
                      <div className="flex-shrink-0 flex-grow-0 basis-full">
                        {item.details.origin_price}
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  );
};
