import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getMaxCountNomer = async () => {
  return (await axiosInstance.get(ApiRoutes.COUNT_NOMER)).data;
};
export const getMaxCountOwner = async () => {
  return (await axiosInstance.get(ApiRoutes.COUNT_OWNER)).data;
};
