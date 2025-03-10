import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
type Props = {
  count: number;
};
export const getMaxCount = async () => {
  return (await axiosInstance.get(ApiRoutes.COUNT)).data;
};
