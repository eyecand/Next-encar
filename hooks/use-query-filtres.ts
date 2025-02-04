import { useRouter } from "next/navigation";
import { Filtres, QueryFilters } from "./use-filters";
import { useEffect, useRef } from "react";
import qs from "qs";

export const useQueryFiltres = (
  makes: string | null,
  model: string | null,
  grades: string | null,
  page: string
) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        makes: makes,
        model: model,
        grades: grades,
      };
      const query = qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
      });
      router.push(`?${query}`, {
        scroll: false,
      });
      console.log(router, 999);
    }
    isMounted.current = true;
  }, [makes, model, grades]);
  return router;
};
