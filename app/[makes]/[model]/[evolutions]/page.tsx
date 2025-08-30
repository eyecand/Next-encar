import { LoadingSpinner, FormKoreaCars } from "@/components/shared";

import React, { Suspense } from "react";
import { findVehicleV2, GetSearchParams } from "@/lib/find-vehicle.-v2";
import PaginationComponent from "@/components/shared/pagination";
import { findCBR } from "@/lib/find-cbr";
import { VehicleList } from "@/app/vehicle-list/vehicle-list";
import Breadcrumb from "@/components/shared/breadcrumb";

interface EvolutionPageProps {
  makes: string;
  model: string;
  evolutions: string;
}
type ParamsProps = Promise<GetSearchParams>;

export default async function EvolutionPage({
  params,
  searchParams,
}: {
  params: Promise<EvolutionPageProps>;
  searchParams: ParamsProps;
}) {
  const { makes, model, evolutions } = await params;
  const searchParamsValue = await searchParams;
  const { page } = searchParamsValue;
  const { vehicle, totalPage } = await findVehicleV2(
    searchParamsValue,
    makes,
    decodeURIComponent(model),
    decodeURIComponent(evolutions)
  );

  const { cbr } = await findCBR();
  const maxPage = Math.ceil(totalPage / 10);
  const currentPage = Math.min(
    maxPage,
    Math.max(1, parseInt((page as string) || "1"))
  );
  const breadcrumbItems = [
    {
      label: makes,
      href: `/${makes}/`,
    },
    {
      label: decodeURIComponent(model),
      href: `/${makes}/${model}`,
    },
    {
      label: decodeURIComponent(evolutions),
      href: `/${makes}/${model}/${evolutions}`,
    },
  ];
  const EUR = cbr.find((item) => item.char_code === "EUR")?.value;
  const KRW = cbr.find((item) => item.char_code === "KRW")?.value;
  const fraht = cbr.find((item) => item.char_code === "fraht")?.value;
  const broker = cbr.find((item) => item.char_code === "broker")?.value;
  const k_krw = cbr.find((item) => item.char_code === "K_KRW")?.value;
  return (
    <div className="mx-auto flex flex-col flex-1 w-full max-w-7xl mt-3 md:mt-10 lg:mt-24">
      <Breadcrumb classname="mt-16 px-5" items={breadcrumbItems} />
      <h1 className="text-2xl md:text-4xl lg:text-[38px] font-bold px-5">
        {decodeURIComponent(makes)} {decodeURIComponent(model)}{" "}
        {decodeURIComponent(evolutions)}
      </h1>
      <FormKoreaCars total={totalPage.toLocaleString()} />
      {/* Список товаров */}

      <Suspense fallback={<LoadingSpinner />}>
        <VehicleList
          vehicle={vehicle}
          EUR={Number(EUR)}
          KRW={Number(KRW)}
          broker={Number(broker)}
          fraht={Number(fraht)}
          k_krw={Number(k_krw)}
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
