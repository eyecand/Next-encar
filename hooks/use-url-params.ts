"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "qs";

export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlParams = useCallback(
    (newParams: Record<string, any>, options?: { scroll?: boolean }) => {
      // Получаем текущие параметры URL
      const currentParams = Object.fromEntries(searchParams.entries());

      // Объединяем текущие параметры с новыми
      const updatedParams = { ...currentParams, ...newParams };

      // Удаляем параметры со значением null или undefined
      Object.keys(updatedParams).forEach((key) => {
        if (
          updatedParams[key] === null ||
          updatedParams[key] === undefined ||
          updatedParams[key] === ""
        ) {
          delete updatedParams[key];
        }
      });

      // Формируем новый URL
      const queryString = qs.stringify(updatedParams, {
        arrayFormat: "comma",
        skipNulls: true,
      });

      router.push(`?${queryString}`, {
        scroll: options?.scroll ?? false,
      });
    },
    [router, searchParams]
  );

  const getUrlParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getAllUrlParams = useCallback(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  return {
    updateUrlParams,
    getUrlParam,
    getAllUrlParams,
  };
}
