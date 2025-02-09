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
      <div className="flex flex-col gap-10  ">
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
