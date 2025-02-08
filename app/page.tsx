import { Accardion, PaginationWithLinks, TopBar } from "@/components/shared";

import { findVehicle, GetSearchParams } from "@/lib/find-vehicle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ParamsProps = Promise<GetSearchParams>;
export default async function Home({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const searchParamsValue = await searchParams;
  const { page, pageSize } = searchParamsValue;

  const { vehicle, totalPage } = await findVehicle(searchParamsValue);
  const currentPage = parseInt((page as string) || "1");
  const take = parseInt((pageSize as string) || "10");
  // const currentPage = searchParams.page ?? 1;

  return (
    <div className="mx-auto max-w-7xl mt-10">
      <h1 className="text-[50px] font-bold px-5 mt-40">
        Autofish - Продажа автомобилей
      </h1>
      <TopBar />

      <Accardion />
      {/* Список товаров */}

      <div className="mt-10 max-w-5xl p-5">
        <div className=" border-b-2 py-5">
          <h2 className="inline-block font-bold text-xl relative subtitle-page">
            {totalPage.toLocaleString()} объявления
          </h2>
        </div>
      </div>

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
                    <div className="mr-5">
                      <Image
                        className="w-auto h-auto"
                        loading="lazy"
                        src={item.photos[0].url}
                        alt="#"
                        width={272}
                        height={204}
                      />
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
      <div className="mt-10">
        {totalPage ? (
          <PaginationWithLinks
            page={currentPage}
            pageSize={take}
            totalCount={totalPage}
          />
        ) : null}
      </div>
    </div>
  );
}
