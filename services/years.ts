import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { cache } from "react";
type YearProps = {
  form_year: number;
};
export const getYears = cache(async (): Promise<YearProps[]> => {
  return (await axiosInstance.get<YearProps[]>(ApiRoutes.YEARS)).data;
});
