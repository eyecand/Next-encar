import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { GradesProps } from "@/components/shared/form-filters";

export const getGrades = async (
  query: string | null,
  model: string | null
): Promise<GradesProps[]> => {
  return (
    await axiosInstance.get<GradesProps[]>(ApiRoutes.GRADES, {
      params: { query, model },
    })
  ).data;
};
