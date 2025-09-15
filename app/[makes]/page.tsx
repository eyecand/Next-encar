import { LoadingSpinner, FormKoreaCars } from "@/components/shared";

import React, { Suspense } from "react";
import { findVehicleV2, GetSearchParams } from "@/lib/find-vehicle.-v2";
import PaginationComponent from "@/components/shared/pagination";
import { findCBR } from "@/lib/find-cbr";
import { VehicleList } from "@/app/vehicle-list/vehicle-list";
import Breadcrumb from "@/components/shared/breadcrumb";

import { Metadata } from "next";
interface CategoryPageProps {
  makes: string;
}
type ParamsProps = Promise<GetSearchParams>;
export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryPageProps>;
}): Promise<Metadata> {
  const { makes } = await params;
  return {
    title: `Купить ${makes} из Южной Кореи (Encar)`,
    description: `Купить/привезти автомобиль ${makes} из Южной Кореи (Encar)`,
  };
}
export default async function MakesPage({
  searchParams,
  params,
}: {
  searchParams: ParamsProps;
  params: Promise<CategoryPageProps>;
}) {
  const searchParamsValue = await searchParams;
  const { makes } = await params;
  const { page } = searchParamsValue;
  const { vehicle, totalPage } = await findVehicleV2(searchParamsValue, makes);
  const { cbrMap } = await findCBR();
  const maxPage = Math.ceil(totalPage / 10);
  const currentPage = Math.min(
    maxPage,
    Math.max(1, parseInt((page as string) || "1"))
  );
  const breadcrumbItems = [
    {
      label: decodeURIComponent(makes),
      href: `/${makes}/`,
    },
  ];
  return (
    <div className="mx-auto flex flex-col flex-1 w-full max-w-7xl mt-16  lg:mt-24">
      <Breadcrumb classname="mt-16 px-5" items={breadcrumbItems} />
      <h1 className="text-2xl md:text-4xl lg:text-[38px] font-bold px-5 ">
        Купить {decodeURIComponent(makes)} из Южной Кореи (Encar)
      </h1>
      <FormKoreaCars total={totalPage.toLocaleString()} />
      {/* Список товаров */}

      <Suspense fallback={<LoadingSpinner />}>
        <VehicleList
          vehicle={vehicle}
          EUR={Number(cbrMap.get("EUR"))}
          KRW={Number(cbrMap.get("KRW"))}
          broker={Number(cbrMap.get("broker"))}
          fraht={Number(cbrMap.get("fraht"))}
          k_krw={Number(cbrMap.get("K_KRW"))}
        />
      </Suspense>
      <div className="mt-16">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={maxPage}
          total={totalPage}
        />
      </div>
    </div>
  );
}
