import { lib_fuels } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getFuels = async (): Promise<lib_fuels[]> => {
  return (await axiosInstance.get<lib_fuels[]>(ApiRoutes.FUELS)).data;
};
