import { vehicle_details } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getYears = async (): Promise<vehicle_details[]> => {
  return (await axiosInstance.get<vehicle_details[]>(ApiRoutes.YEARS)).data;
};
