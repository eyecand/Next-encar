import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
type FuelProps = {
  fuel_english: string | null;
};
export const getFuels = async (): Promise<FuelProps[]> => {
  return (await axiosInstance.get<FuelProps[]>(ApiRoutes.FUELS)).data;
};
